using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Framework.WebApplication.WebApi.Controllers;
using Training.DriverManagement.Api.Models;
using Training.DriverManagement.Api.Repositories;
using System.Threading.Tasks;
using Training.DriverManagement.Api.Exceptions;

namespace Training.DriverManagement.Api.Api.Queries
{
    public class UserQuery : HypermediaQuery
    {
        private readonly IUserRepository _userRepository;

        public UserQuery(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }


        [Route(ApiRoutes.Users)]
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return (await this._userRepository.GetUsersAsync()).Where(t=>!t.IsDeleted);
        }

        [Route(ApiRoutes.User)]
        public async Task<User> GetUserAsync(int id)
        {
            var user = (await this._userRepository.GetUsersAsync()).FirstOrDefault(t => t.Id == id);
            if (user == null) throw new EntityNotFoundException<User>(id);
            return user;
        }
    }
}