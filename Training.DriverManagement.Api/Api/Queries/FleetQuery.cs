using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Framework.WebApplication.WebApi.Controllers;
using Training.DriverManagement.Api.Exceptions;
using Training.DriverManagement.Api.Models;
using Training.DriverManagement.Api.Repositories;
using System.Threading.Tasks;

namespace Training.DriverManagement.Api.Api.Queries
{
    public class FleetQuery: HypermediaQuery
    {
        private readonly IFleetRepository _fleetRepository;


        public FleetQuery(IFleetRepository fleetRepository)
        {
            this._fleetRepository = fleetRepository;
        }

        [Route(ApiRoutes.Fleets)]
        public async Task<IEnumerable<Fleet>> GetFleetsAsync()
        {
            return (await this._fleetRepository.GetFleetsAsync()).Where(t=>!t.IsDeleted);
        }

        [Route(ApiRoutes.Fleet)]
        public async Task<Fleet> GetfleetAsync(int id)
        {
            var fleet = (await this._fleetRepository.GetFleetsAsync()).FirstOrDefault(t => t.Id == id);
            if (fleet == null)
                throw new EntityNotFoundException<Fleet>(id);
            return fleet;
        }

        [Route(ApiRoutes.FleetVehicles)]
        public async Task<IEnumerable<Vehicle>> GetFleetVehiclesAsync(int id)
        {
            var fleet = (await this._fleetRepository.GetFleetsAsync()).FirstOrDefault(t => t.Id == id);
            if (fleet == null)
                throw new EntityNotFoundException<Fleet>(id);

            return fleet.Vehicles;
        }
    }
}