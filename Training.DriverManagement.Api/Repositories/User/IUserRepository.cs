using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Training.DriverManagement.Api.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<Models.User>> GetUsersAsync();
        Task<Models.User> AddUserAsync(string email, string firstName, string lastName, string phoneNo = null);
    }
}
