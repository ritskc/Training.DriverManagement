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

namespace Training.DriverManagement.Api.Api.Commands.Vehicle.DeleteVehicle
{
    public class DeleteVehicleCommandHandler :HypermediaCommandHandler<DeleteVehicleCommand>
    {
        private readonly IVehicleRepository _vehicleRepository;

        public DeleteVehicleCommandHandler(IVehicleRepository vehicleRepository)
        {
            DefProg.For(vehicleRepository,"VehicleRepository").IsNotNull();
            this._vehicleRepository = vehicleRepository;
        }

        protected override void SetupValidation(IValidator<DeleteVehicleCommand> validator)
        {
            base.SetupValidation(validator);
            validator.For(t => t.Id)
                .IsRequired();
                //.EnsureAsync(async t => (await this._vehicleRepository.GetVehiclesAsync()).Any(u => u.Id == t))
                //.WithMessage("Vehicle not found");
        }

        protected override async Task HandleAsync(DeleteVehicleCommand command)
        {
            var vehicle = (await this._vehicleRepository.GetVehiclesAsync()).FirstOrDefault(t => t.Id == command.Id);

            if (vehicle == null) throw new EntityNotFoundException<Models.Vehicle>(command.Id);
            vehicle.Delete(command.VersionNo);
           
        }
    }
}