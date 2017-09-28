using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Framework.Validation;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.DeleteFleet
{
    public class DeleteFleetCommandHandler: HypermediaCommandHandler<DeleteFleetCommand>
    {
        private readonly IFleetRepository _fleetRepository;

        public DeleteFleetCommandHandler(IFleetRepository fleetRepository)
        {
            this._fleetRepository = fleetRepository;
        }


        protected override void SetupValidation(IValidator<DeleteFleetCommand> validator)
        {
            base.SetupValidation(validator);

            validator.For(t => t.Id)
                .IsRequired();
        }

        protected override async Task HandleAsync(DeleteFleetCommand command)
        {
            var fleet = (await this._fleetRepository.GetFleetsAsync()).FirstOrDefault(t => t.Id == command.Id);
            if (fleet != null)
                fleet.Delete(command.VersionNo);
        }
    }
}