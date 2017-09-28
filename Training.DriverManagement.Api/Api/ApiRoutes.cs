using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Training.DriverManagement.Api.Api
{
    public static class ApiRoutes
    {
        private const string _query = "Query/";

        public const string Drivers = _query + "Drivers";
        public const string Driver = Drivers + "/{id}";

        public const string Users = _query +  "Users";
        public const string User = Users + "/{id}";

        public const string Vehicles = _query + "Vehicles";
        public const string Vehicle = Vehicles + "/{id}";

        public const string Fleets = _query + "Fleets";
        public const string Fleet = Fleets + "/{id}";
        public const string FleetVehicles = Fleet + "/Vehicles";
    }
}