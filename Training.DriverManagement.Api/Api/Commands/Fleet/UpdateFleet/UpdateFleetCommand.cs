using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Framework.WebApplication.WebApi.Commanding;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.UpdateFleet
{
    [HttpPut]
    public class UpdateFleetCommand:HypermediaCommand
    {
        public int VersionNo { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}