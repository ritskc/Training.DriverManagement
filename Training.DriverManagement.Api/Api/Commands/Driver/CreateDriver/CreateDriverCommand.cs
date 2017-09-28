using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.Driver.CreateDriver
{
    [HttpPost]
    public class CreateDriverCommand: HypermediaCommand
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}