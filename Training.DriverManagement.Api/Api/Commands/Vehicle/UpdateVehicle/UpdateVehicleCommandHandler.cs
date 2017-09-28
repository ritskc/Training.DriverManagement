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

namespace Training.DriverManagement.Api.Api.Commands.Vehicle.UpdateVehicle
{
    public class UpdateVehicleCommandHandler:HypermediaCommandHandler<UpdateVehicleCommand,Models.Vehicle>
    {
        private readonly IVehicleRepository _vehicleRepository;


        public UpdateVehicleCommandHandler(IVehicleRepository vehicleRepository)
        {
            DefProg.For(vehicleRepository, "VehicleRepository").IsNotNull();
            this._vehicleRepository = vehicleRepository;
        }


        protected override void SetupValidation(IValidator<UpdateVehicleCommand> validator)
        {
            base.SetupValidation(validator);
            validator.For(t => t.Id)
                .IsRequired()
                .EnsureAsync(async t => (await this._vehicleRepository.GetVehiclesAsync()).Any(u => u.Id == t))
                .WithMessage("Vehicle not found");
        }

        protected override async Task<Models.Vehicle> HandleAsync(UpdateVehicleCommand command)
        {
            var vehicle = (await this._vehicleRepository.GetVehiclesAsync()).FirstOrDefault(t => t.Id == command.Id);
            if(vehicle==null)
                throw new EntityNotFoundException<Models.Vehicle>(command.Id);

            vehicle.Update(command.VersionNo, command.Description,command.Type,command.Make,command.Model);

            return vehicle;
        }
    }
}