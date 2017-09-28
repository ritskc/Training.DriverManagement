using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.Vehicle.UpdateVehicle
{
    [HttpPut]
    public class UpdateVehicleCommand:HypermediaCommand
    {
        public int VersionNo { get; set; }
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
       
    }
}