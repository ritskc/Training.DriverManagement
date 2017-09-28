module DriverManagement
{
    @Core.Inject("FleetService", "NavigationService", "DialogService")
    @Core.Resolve("Fleets", "Vehicles")
    export class FleetsViewModel extends Core.PageViewModel
    {
        private _fleetService: IFleetService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _fleets: Ext.IList<Fleet>;
        private _vehicles: Ext.IList<Vehicle>;

        public get Fleets(): Ext.IList<Fleet> { return this._fleets; }
        public get Vehicles(): Ext.IList<Vehicle> { return this._vehicles; }


        constructor(fleetService: IFleetService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            fleets: Ext.IList<Fleet>, vehicles: Ext.IList<Vehicle>)
        {
            super();

            DefProg.For(fleetService, "fleetService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._fleetService = fleetService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._fleets = fleets;
            this._vehicles = vehicles;
        }


        public AddFleet(): void
        {
            this._navigationService.Navigate("Main.ManageFleet");
        }

        public EditFleet(fleet: Fleet): void
        {
            if (fleet == null)
                throw new Exceptions.ArgumentNullException("fleet");

            this._navigationService.Navigate("Main.ManageFleet", {id: fleet.Id});
        }

        public async DeleteFleet(fleet: Fleet): Promise<void>
        {
            if (fleet == null)
                throw new Exceptions.ArgumentNullException("fleet");

            if (!confirm("Are you sure?")) return;

            try
            {
                await this._fleetService.DeleteFleetAsync(fleet.VersionNo, fleet.Id);
            }
            catch (e)
            {
                this._dialogService.ShowErrorMessage("Failed to delete fleet.");
            }
            finally
            {
                this._fleets = await this._fleetService.GetFleetsAsync();
            }
        }

        public AssignVehiclesToFleet(fleet: Fleet): void
        {
            this._navigationService.Navigate("Main.AssignVehiclesToFleet", {id: fleet.Id});
        }
    }
}