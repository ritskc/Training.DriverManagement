using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.ManageFleetVehicles
{
    public class ManageFleetVehiclesCommandHandler: HypermediaCommandHandler<ManageFleetVehiclesCommand>
    {
        private readonly IFleetRepository _fleetRepository;


        public ManageFleetVehiclesCommandHandler(IFleetRepository fleetRepository)
        {
            this._fleetRepository = fleetRepository;
        }



        protected override void SetupValidation(IValidator<ManageFleetVehiclesCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.FleetId)
                .IsRequired()
                .EnsureAsync(async t => (await this._fleetRepository.GetFleetsAsync()).Any(u => u.Id == t))
                .WithMessage("Fleet not found.");

            //validator.For(t => t.AssignedVehicles).IsRequired();
        }


        protected override async Task HandleAsync(ManageFleetVehiclesCommand command)
        {
            var fleet = (await this._fleetRepository.GetFleetsAsync()).First(t => t.Id == command.FleetId);

            fleet.ManageFleetVehilces(command.VersionNo, command.AssignedVehicles);
        }
    }
}