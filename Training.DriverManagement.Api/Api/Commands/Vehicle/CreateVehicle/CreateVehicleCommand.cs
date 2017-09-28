using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.Vehicle.CreateVehicle
{
    [HttpPost]
    public class CreateVehicleCommand: HypermediaCommand
    {
        public string Description { get; set; }
        public string Type { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
    }
}