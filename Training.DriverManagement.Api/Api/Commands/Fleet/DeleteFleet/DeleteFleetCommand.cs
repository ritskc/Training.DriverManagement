using Framework.WebApplication.WebApi.Commanding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Training.DriverManagement.Api.Api.Commands.Fleet.DeleteFleet
{
    [HttpDelete]
    public class DeleteFleetCommand: HypermediaCommand
    {
        public int VersionNo { get; set; }
        public int Id { get; set; }
    }
}