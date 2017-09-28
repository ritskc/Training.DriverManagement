using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Training.DriverManagement.Api.Repositories
{
    public interface IFleetRepository
    {
        Task<IEnumerable<Models.Fleet>> GetFleetsAsync();

        Task<Models.Fleet> AddFleetAsync(string name, string description);
    }
}
