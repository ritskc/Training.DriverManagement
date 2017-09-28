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

namespace Training.DriverManagement.Api.Api.Commands.Driver.UpdateDriver
{
    public class UpdateDriverCommandHandler: HypermediaCommandHandler<UpdateDriverCommand, Models.Driver>
    {
        private readonly IDriverRepository _driverRepository;


        public UpdateDriverCommandHandler(IDriverRepository driverRepository)
        {
            DefProg.For(driverRepository, "DriverRepository").IsNotNull();

            this._driverRepository = driverRepository;
        }


        protected override void SetupValidation(IValidator<UpdateDriverCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Id)
                .IsRequired()
                .EnsureAsync(async t => (await this._driverRepository.GetDriversAsync()).Any(u => u.Id == t));

            validator.For(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(15);

            validator.For(t => t.LastName)
                .IsRequired()
                .HasMaxLength(20);

            validator.For(t => t.Phone)
                .IsOptional()
                .IsPhoneOrFaxNumber();

            validator.For(t => t.Email)
                .IsOptional()
                .IsEmail();
        }

        protected override async Task<Models.Driver> HandleAsync(UpdateDriverCommand command)
        {
            var driver = (await this._driverRepository.GetDriversAsync()).FirstOrDefault(t => t.Id == command.Id);
            
            if(driver == null)
                throw  new EntityNotFoundException<Models.Driver>(command.Id);

            driver.Update(command.VersionNo, command.FirstName, command.LastName, command.Phone, command.Email);

            return driver;
        }
    }
}