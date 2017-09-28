module DriverManagement
{
    @Core.Inject("FleetService", "NavigationService")
    export class FleetViewModel extends Core.PageViewModel
    {
        private _fleetService: IFleetService;
        private _navigationService: Services.INavigationService;


        public get Fleet(): Ext.IList<Fleet> { return this._fleetService.GetFleets(); }


        constructor(fleetService: IFleetService, navigationService: Services.INavigationService)
        {
            super();

            if (fleetService == null)
                throw new Exceptions.ArgumentNullException("fleetService");

            if (navigationService == null)
                throw new Exceptions.ArgumentNullException("navigationService");

            this._fleetService = fleetService;
            this._navigationService = navigationService;
        }


        public AddFleet(): void
        {
            this._navigationService.Navigate("Main.CreateFleet");
        }

        public EditFleet(fleet: Fleet): void
        {
            if (fleet == null)
                throw new Exceptions.ArgumentNullException("fleet");

            this._navigationService.Navigate("Main.CreateFleet", {id: fleet.Id});
        }

        public DeleteFleet(fleet: Fleet): void
        {
            if (fleet == null)
                throw new Exceptions.ArgumentNullException("fleet");

            this._fleetService.DeleteFleet(fleet.Id);            
        }

        public AssignVehicles(): void
        {
            this._navigationService.Navigate("Main.AssignFleet");
        }

    }
}