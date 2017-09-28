using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Exceptions;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.User.UpdateUser
{
    public class UpdateUserCommandHandler: HypermediaCommandHandler<UpdateUserCommand, Models.User>
    {
        private readonly IUserRepository _userRepository;


        public UpdateUserCommandHandler(IUserRepository userRepository)
        {
            DefProg.For(userRepository, "UserRepository").IsNotNull();

            this._userRepository = userRepository;
        }


        protected override void SetupValidation(IValidator<UpdateUserCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Id)
                .IsRequired()
                .EnsureAsync(async t => (await this._userRepository.GetUsersAsync()).Any(u => u.Id == t))
                .WithMessage("User Not Found");

            validator.For(t => t.Email)
                .IsRequired()
                .HasMaxLength(20)
                .EnsureTAsync(async t => (await this._userRepository.GetUsersAsync()).Where(u=>u.Id != t.Id).All(w=>w.Email != t.Email)); 

            validator.For(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(20);

            validator.For(t => t.LastName)
                .IsRequired()
                .HasMaxLength(20);
        }

        protected override async Task<Models.User> HandleAsync(UpdateUserCommand command)
        {
            var user = (await this._userRepository.GetUsersAsync()).FirstOrDefault(t => t.Id == command.Id);

            if(user == null)
                throw  new EntityNotFoundException<Models.User>(command.Id);

            user.Update(command.VersionNo, command.Email, command.FirstName, command.LastName, command.PhoneNo);

            return user;
        }
    }
}