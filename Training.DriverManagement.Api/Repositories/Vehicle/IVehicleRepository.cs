using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Training.DriverManagement.Api.Repositories
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Models.Vehicle>> GetVehiclesAsync();
        Task<Models.Vehicle> AddVehicleAsync(string description, string type, string make, string model);
    }
}
