using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;
using Training.DriverManagement.Api.Models;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.ManageFleetVehicles
{
    [HttpPut]
    public class ManageFleetVehiclesCommand: HypermediaCommand
    {
        public int VersionNo { get; set; }
        public int FleetId { get; set; }
        public IEnumerable<Models.Vehicle> AssignedVehicles { get; set; }
    }
}