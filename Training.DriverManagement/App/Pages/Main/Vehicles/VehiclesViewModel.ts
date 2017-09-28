module DriverManagement
{
    @Core.Inject("VehicleService", "NavigationService", "DialogService")
    @Core.Resolve("Vehicles")
    export class VehicleViewModel extends Core.PageViewModel
    {
        private _vehicleService: IVehicleService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _vehicles: Ext.IList<Vehicle>;


        public get Vehicles(): Ext.IList<Vehicle> { return this._vehicles; }


        constructor(vehicleService: IVehicleService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            vehicles: Ext.IList<Vehicle>)
        {
            super();

            DefProg.For(vehicleService, "driverService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._vehicleService = vehicleService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._vehicles = vehicles;
        }


        public AddVehicle(): void
        {
            this._navigationService.Navigate("Main.ManageVehicle");
        }

        public EditVehicle(vehicle: Vehicle): void
        {
            if (vehicle == null)
                throw new Exceptions.ArgumentNullException("vehicle");

            this._navigationService.Navigate("Main.ManageVehicle", {id: vehicle.Id});
        }

        public async DeleteVehicle(vehicle: Vehicle): Promise<void>
        {
            if (vehicle == null)
                throw new Exceptions.ArgumentNullException("vehicle");

            if (!confirm("Are you sure?")) return;

            try
            {
                await this._vehicleService.DeleteVehicleAsync(vehicle.VersionNo, vehicle.Id);
            }
            catch (e)
            {
                this._dialogService.ShowErrorMessage("Failed to delete vehicle.");
            }
            finally
            {
                this._vehicles = await this._vehicleService.GetVehiclesAsync();
            }
        }

        public VehicleFleetAssignment(vehicle: Vehicle): void
        {
            if (vehicle == null)
                throw new Exceptions.ArgumentNullException("vehicle");

            this._navigationService.Navigate("Main.VehicleFleet", { id: vehicle.Id });
        }
    }
}