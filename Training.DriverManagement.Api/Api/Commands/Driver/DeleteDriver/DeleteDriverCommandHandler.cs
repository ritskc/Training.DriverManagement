using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Driver.DeleteDriver
{
    public class DeleteDriverCommandHandler: HypermediaCommandHandler<DeleteDriverCommand>
    {
        private readonly IDriverRepository _driverRepository;


        public DeleteDriverCommandHandler(IDriverRepository driverRepository)
        {
            DefProg.For(driverRepository, "DriverRepository").IsNotNull();

            this._driverRepository = driverRepository;
        }


        protected override void SetupValidation(IValidator<DeleteDriverCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Id)
                .IsRequired()
                .WithMessage("Driver Id is required");
        }

        protected override async Task HandleAsync(DeleteDriverCommand command)
        {
            var driver = (await this._driverRepository.GetDriversAsync()).FirstOrDefault(t => t.Id == command.Id);

            if(driver != null)
                driver.Delete(command.VersionNo);

            //throw new ApplicationException("Test");
        }
    }
}