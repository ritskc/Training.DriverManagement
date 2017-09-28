using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Vehicle.CreateVehicle
{
    public class CreateVehicleCommandHandler: HypermediaCommandHandler<CreateVehicleCommand, Models.Vehicle>
    {
        private readonly IVehicleRepository _vehicleRepository;

        public CreateVehicleCommandHandler(IVehicleRepository vehicleRepository)
        {
            DefProg.For(vehicleRepository, "vehicleRepository").IsNotNull();

            this._vehicleRepository = vehicleRepository;
        }


        protected override void SetupValidation(IValidator<CreateVehicleCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Description).IsRequired().HasMaxLength(50);
        }

        protected override Task<Models.Vehicle> HandleAsync(CreateVehicleCommand command)
        {
            return this._vehicleRepository.AddVehicleAsync(command.Description, command.Type, command.Make, command.Model);
        }
    }
}