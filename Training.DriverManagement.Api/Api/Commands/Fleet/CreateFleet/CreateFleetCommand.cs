using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.CreateFleet
{
    [HttpPost]
    public class CreateFleetCommand: HypermediaCommand
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}