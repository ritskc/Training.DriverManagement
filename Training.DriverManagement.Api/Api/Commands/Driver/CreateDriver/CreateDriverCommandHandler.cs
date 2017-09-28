using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Driver.CreateDriver
{
    public class CreateDriverCommandHandler: HypermediaCommandHandler<CreateDriverCommand, Models.Driver>
    {
        private readonly IDriverRepository _driverRepository;


        public CreateDriverCommandHandler(IDriverRepository driverRepository)
        {
            DefProg.For(driverRepository, "DriverRepository").IsNotNull();

            this._driverRepository = driverRepository;
        }


        protected override void SetupValidation(IValidator<CreateDriverCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(15);

            validator.For(t => t.LastName)
                .IsRequired()
                .HasMaxLength(20);

            validator.For(t => t.Email)
                .IsOptional()
                .IsEmail();

            validator.For(t => t.Phone)
                .IsOptional()
                .IsPhoneOrFaxNumber();
        }

        protected override Task<Models.Driver> HandleAsync(CreateDriverCommand command)
        {
            return this._driverRepository.AddDriverAsync(command.FirstName, command.LastName, command.Phone, command.Email);
        }
    }
}