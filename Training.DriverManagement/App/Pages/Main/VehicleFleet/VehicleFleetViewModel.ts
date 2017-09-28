module DriverManagement
{
    @Core.Inject("FleetService", "VehicleService", "NavigationService", "DialogService")
    @Core.Resolve("Fleets", "Vehicles")
    export class VehicleFleetViewModel extends Core.PageViewModel
    {
        private _fleetService: IFleetService;
        private _vehicleService: IVehicleService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _fleets: Ext.IList<Fleet>;
        private _fleet: Fleet;
        private _vehicles: Ext.IList<Vehicle>;
        private _vehicle: Vehicle;
        private _unassignedFleets: Ext.IList<Fleet>;
        private _assignedFleets: Ext.IList<Fleet>;


        public get UnassignedFleets(): Ext.IList<Fleet> { return this._unassignedFleets; }
        public get AssignedFleets(): Ext.IList<Fleet> { return this._assignedFleets; }


        constructor(fleetService: IFleetService, vehicleService: IVehicleService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            vehicles: Ext.IList<Vehicle>, fleets: Ext.IList<Fleet>)
        {
            super();

            DefProg.For(fleetService, "fleetService").IsNotNull();
            DefProg.For(vehicleService, "vehicleService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._fleetService = fleetService;
            this._vehicleService = vehicleService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._vehicles = vehicles;
            this._fleets = fleets;

            this.Initialize();
        }

        public AddFleet(fleet: Fleet): void
        {
            this._unassignedFleets.Remove(fleet);
            this._assignedFleets.Add(fleet);
        }

        public RemoveFleet(fleet: Fleet): void
        {
            this._assignedFleets.Remove(fleet);
            this._unassignedFleets.Add(fleet);
        }

        public Save(): void
        {
            var vehicle = this._vehicles.First(t => t.Id === this._vehicle.Id);

            vehicle.Fleets = this._assignedFleets.ToList();
            this._navigationService.Navigate("Main.Vehicles");

        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Vehicles");
        }

        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));

            if (id == null || isNaN(id) || this._vehicles.All(t => t.Id !== id))
            {
                this._navigationService.NavigateReplaceHistory("Main.Vehicles");
            } else
            {
                var originVehicle = this._vehicles.FirstOrDefault(t => t.Id === id);
                if (originVehicle == null)
                {
                    this._navigationService.NavigateReplaceHistory("Main.Vehicles");
                    return;
                }

                this._vehicle = Ext.ObjectExt.Convert<Vehicle>(originVehicle, Vehicle);

                this._assignedFleets = this._vehicle.Fleets.ToList();
            }

            this._unassignedFleets = this._fleets
                .Where(t => this._assignedFleets.All(u => u.Id !== t.Id))
                .ToList();
        }
    }
}