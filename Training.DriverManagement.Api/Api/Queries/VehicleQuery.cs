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
    public class VehicleQuery: HypermediaQuery
    {
        private readonly IVehicleRepository _vehicleRepository;


        public VehicleQuery(IVehicleRepository vehicleRepository)
        {
            this._vehicleRepository = vehicleRepository;
        }

        [Route(ApiRoutes.Vehicles)]
        public  async Task<IEnumerable<Vehicle>> GetVehiclesAsync()
        {
            return (await this._vehicleRepository.GetVehiclesAsync()).Where(t=>!t.IsDeleted);
        }

        [Route(ApiRoutes.Vehicle)]
        public async Task<Vehicle> GetVehicleAsync(int id)
        {
            var vehicle = (await this._vehicleRepository.GetVehiclesAsync()).FirstOrDefault(t => t.Id == id);
            if (vehicle == null)
                throw new EntityNotFoundException<Vehicle>(id);
            return vehicle;
        }
    }
}