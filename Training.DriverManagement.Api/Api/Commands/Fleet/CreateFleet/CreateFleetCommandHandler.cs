using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.DefensiveProgramming;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.CreateFleet
{
    public class CreateFleetCommandHandler: HypermediaCommandHandler<CreateFleetCommand, Models.Fleet>
    {
        private readonly IFleetRepository _fleetRepository;


        public CreateFleetCommandHandler(IFleetRepository fleetRepository)
        {
            DefProg.For(fleetRepository, "fleetRepository").IsNotNull();

            this._fleetRepository = fleetRepository;
        }


        protected override void SetupValidation(IValidator<CreateFleetCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Name).IsRequired().HasMaxLength(15);
            validator.For(t => t.Description).IsOptional().HasMaxLength(1000);
        }

        protected override Task<Models.Fleet> HandleAsync(CreateFleetCommand command)
        {
            return this._fleetRepository.AddFleetAsync(command.Name, command.Description);
        }
    }
}