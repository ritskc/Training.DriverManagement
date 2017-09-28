using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Training.DriverManagement.Api.Repositories
{
    public interface IDriverRepository
    {
        Task<IEnumerable<Models.Driver>> GetDriversAsync();
        Task<Models.Driver> AddDriverAsync(string firstName, string lastName, string phone, string email = null);
    }
}
