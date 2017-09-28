using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.User.UpdateUser
{
    [HttpPut]
    public class UpdateUserCommand: HypermediaCommand
    {
        public int VersionNo { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNo { get; set; }
    }
}