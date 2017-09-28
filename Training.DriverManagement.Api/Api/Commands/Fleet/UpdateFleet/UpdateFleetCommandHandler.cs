using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Microsoft.Ajax.Utilities;
using Training.DriverManagement.Api.Api.Commands.Fleet.CreateFleet;
using Training.DriverManagement.Api.Exceptions;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.UpdateFleet
{
    public class UpdateFleetCommandHandler : HypermediaCommandHandler<UpdateFleetCommand,Models.Fleet>
    {
        private readonly IFleetRepository _fleetRepository;

        public UpdateFleetCommandHandler(IFleetRepository fleetRepository)
        {
            DefProg.For(fleetRepository, "FleetRepository").IsNotNull();
            this._fleetRepository = fleetRepository;
        }

        protected override void SetupValidation(IValidator<UpdateFleetCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Id)
                .IsRequired()
                .EnsureAsync(async t => (await this._fleetRepository.GetFleetsAsync()).Any(u => u.Id == t))
                .WithMessage("Fleet not found");

            validator.For(t => t.Name)
                .IsRequired()
                .HasMaxLength(10);

            validator.For(t => t.Description)
                .IsOptional()
                .HasMaxLength(50);
        }

        protected override async Task<Models.Fleet> HandleAsync(UpdateFleetCommand command)
        {
            var fleet = (await this._fleetRepository.GetFleetsAsync()).FirstOrDefault(t => t.Id == command.Id);

            //if (fleet == null) throw new EntityNotFoundException<Models.Fleet>(command.Id);
            fleet.Update(command.VersionNo, command.Name,command.Description);

            return fleet;
        }
    }
}