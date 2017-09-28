module DriverManagement
{
    export class AppModule extends Core.AngularModule
    {
        constructor(name: string)
        {
            super(name, true);
        }




        protected ConfigureServices(serviceConfiguration: Core.ServiceConfiguration): void
        {
            serviceConfiguration
                .RegisterService("DriverService", RemoteDriverService)
                .RegisterService("UserService", RemoteUserService)
                .RegisterService("VehicleService", RemoteVehicleService)
                .RegisterService("FleetService", RemoteFleetService);
        }

        protected ConfigureResolvers(resolverConfiguration: Core.ResolverConfiguration): void
        {
            resolverConfiguration.RegisterResolver("Users", UsersResolver);
            resolverConfiguration.RegisterResolver("Drivers", DriversResolver);
            resolverConfiguration.RegisterResolver("Vehicles", VehiclesResolver);
            resolverConfiguration.RegisterResolver("Fleets", FleetsResolver);
        }

        protected ConfigureDirectives(directiveConfiguration: Core.DirectiveConfiguraton): void
        {
            directiveConfiguration.RootViewsFolder = "App/Directives/";

            directiveConfiguration.RegisterDirective("topNavBar", TopNavBarDirective);
        }

        protected ConfigurePages(pageConfiguration: Core.PageConfiguration): void
        {
            pageConfiguration.RootViewsFolder = "App/Pages/";

            pageConfiguration.UnknownUrlRedirect = "Main/Users";


            var main = new Core.Page("Main", "/Main", MainViewModel, "Main/MainView.html").AsAbstract()
                .AddChildPage(new Core.Page("Drivers", "/Drivers", DriversViewModel, "Main/Drivers/DriversView.html"))
                .AddChildPage(new Core.Page("ManageDriver", "/ManageDriver?id", ManageDriverViewModel, "Main/ManageDriver/ManageDriverView.html"))

                .AddChildPage(new Core.Page("Users", "/Users", UsersViewModel, "Main/Users/UsersView.html"))
                .AddChildPage(new Core.Page("ManageUser", "/ManageUser?id", ManageUserViewModel, "Main/ManageUser/ManageUserView.html"))

                .AddChildPage(new Core.Page("Vehicles", "/Vehicles", VehicleViewModel, "Main/Vehicles/VehiclesView.html"))
                .AddChildPage(new Core.Page("ManageVehicle", "/ManageVehicle?id", ManageVehicleViewModel, "Main/ManageVehicle/ManageVehicleView.html"))
                .AddChildPage(new Core.Page("VehicleFleet", "/VehicleFleet?id", VehicleFleetViewModel, "Main/VehicleFleet/VehicleFleetView.html"))
				 .AddChildPage(new Core.Page("Fleets", "/Fleets", FleetsViewModel, "Main/Fleets/FleetsView.html"))
                .AddChildPage(new Core.Page("ManageFleet", "/ManageFleet?id", ManageFleetViewModel, "Main/ManageFleet/ManageFleetView.html"))
                .AddChildPage(new Core.Page("AssignVehiclesToFleet", "/AssignVehiclesToFleet?id", AssignVehiclesToFleetViewModel,
                    "Main/AssignVehiclesToFleet/AssignVehiclesToFleetView.html")); 
                


            pageConfiguration.RegisterPage(main);
        }
    }
}