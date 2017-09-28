using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.User.DeleteUser
{
    public class DeleteUserCommandHandler: HypermediaCommandHandler<DeleteUserCommand>
    {
        private readonly IUserRepository _userRepository;


        public DeleteUserCommandHandler(IUserRepository userRepository)
        {
            DefProg.For(userRepository, "UserRepository").IsNotNull();

            this._userRepository = userRepository;
        }


        protected override void SetupValidation(IValidator<DeleteUserCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Id)
                .IsRequired();
        }

        protected override async Task HandleAsync(DeleteUserCommand command)
        {
            var user = (await this._userRepository.GetUsersAsync()).FirstOrDefault(t => t.Id == command.Id);

            if (user != null)
                user.Delete(command.VersionNo);
        }
    }
}