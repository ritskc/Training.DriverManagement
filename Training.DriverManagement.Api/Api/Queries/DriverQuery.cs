using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Framework.WebApplication.WebApi.Controllers;
using Training.DriverManagement.Api.Exceptions;
using Training.DriverManagement.Api.Models;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api.Api.Queries
{
    public class DriverQuery: HypermediaQuery
    {
        private readonly IDriverRepository _driverRepository;


        public DriverQuery(IDriverRepository driverRepository)
        {
            this._driverRepository = driverRepository;
        }


        [Route(ApiRoutes.Drivers)]
        public async Task<IEnumerable<Driver>> GetDriversAsync()
        {
            await Task.Delay(TimeSpan.FromSeconds(3));

            throw new ApplicationException("Query error");
            return (await this._driverRepository.GetDriversAsync()).Where(t=>!t.IsDeleted);
        }

        [Route(ApiRoutes.Driver)]
        public async Task<Driver> GetDriverAsync(int id)
        {
            var driver = (await this._driverRepository.GetDriversAsync()).Where(t => !t.IsDeleted).FirstOrDefault(t => t.Id == id);
            if(driver == null) throw new EntityNotFoundException<Driver>(id);
            return driver;
        }
    }
}