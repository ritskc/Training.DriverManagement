module DriverManagement
{
    @Core.Inject("VehicleService", "FleetService", "NavigationService", "DialogService")
    @Core.Resolve("Vehicles", "Fleets")
    export class AssignVehiclesToFleetViewModel extends Core.PageViewModel
    {
        private _vehicleService: IVehicleService;
        private _fleetService: IFleetService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _fleets: Ext.IList<Fleet>;
        private _fleet: Fleet;
        private _vehicles: Ext.IList<Vehicle>;
        private _vehicle: Vehicle;
        private _assignedVehicles: Ext.IList<Vehicle>;
        private _unassignedVehicles: Ext.IList<Vehicle>;


        public get Fleet(): Fleet { return this._fleet; }
        public get AssignedVehicles(): Ext.IList<Vehicle> { return this._assignedVehicles; }
        public get UnassignedVehicles(): Ext.IList<Vehicle> { return this._unassignedVehicles; }


        constructor(vehicleService: IVehicleService, fleetService: IFleetService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            vehicles: Ext.IList<Vehicle>, fleets: Ext.IList<Fleet>)
        {
            super();

            DefProg.For(vehicleService, "vehicleService").IsNotNull();
            DefProg.For(fleetService, "fleetService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._vehicleService = vehicleService;
            this._fleetService = fleetService;
            this._navigationService = navigationService;
            this._vehicles = vehicles;
          
            this._fleets = fleets;
           
            this.Initialize();
        }


        public AssignVehicle(vehicle: Vehicle): void
        {
            this._unassignedVehicles.Remove(vehicle);
            this._assignedVehicles.Add(vehicle);
        }

        public UnassignVehicle(vehicle: Vehicle): void
        {
            this._assignedVehicles.Remove(vehicle);
            this._unassignedVehicles.Add(vehicle);
        }


        public async Save(): Promise<void>
        {
            await this._fleetService.ManageFleetVehiclesAsync(this._fleet.VersionNo, this._fleet.Id, this._assignedVehicles);
            this._navigationService.Navigate("Main.Fleets");
        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Fleets");
        }


        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));
           
            if (id == null || isNaN(id) || this._fleets.All(t => t.Id !== id))
            {
                this._navigationService.NavigateReplaceHistory("Main.Fleets");
            } else
            {
                
                this._fleet = this._fleets.First(t => t.Id === id);
                this._assignedVehicles = this._fleet.Vehicles.ToList();
            }
            
            this._unassignedVehicles = this._vehicles
                .Where(t => this._assignedVehicles.All(u => u.Id !== t.Id))
                .ToList();
        }
    }
}