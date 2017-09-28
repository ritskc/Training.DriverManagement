using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.User.CreateUser
{
    public class CreateUserCommandHandler: HypermediaCommandHandler<CreateUserCommand, Models.User>
    {
        private readonly IUserRepository _userRepository;


        public CreateUserCommandHandler(IUserRepository userRepository)
        {
            DefProg.For(userRepository, "UserRepository").IsNotNull();

            this._userRepository = userRepository;
        }


        protected override void SetupValidation(IValidator<CreateUserCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Email)
                .IsRequired()
                .HasMaxLength(20)
                .EnsureAsync(async t => (await this._userRepository.GetUsersAsync()).All(u => u.Email != t))
                .WithMessage("Email already exists");

            validator.For(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(20);

            validator.For(t => t.LastName)
                .IsRequired()
                .HasMaxLength(20);

        }

        protected override Task<Models.User> HandleAsync(CreateUserCommand command)
        {
            return this._userRepository.AddUserAsync(command.Email, command.FirstName, command.LastName, command.PhoneNo);
        }
    }
}