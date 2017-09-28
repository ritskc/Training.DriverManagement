using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.Vehicle.DeleteVehicle
{
    [HttpDelete]
    public class DeleteVehicleCommand:HypermediaCommand
    {
        public int VersionNo { get; set; }
        public int Id { get; set; }
    }
}