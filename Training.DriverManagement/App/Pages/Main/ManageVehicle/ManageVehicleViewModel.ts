module DriverManagement
{
    @Core.Inject("VehicleService", "NavigationService", "DialogService")
    @Core.Resolve("Vehicles")
    export class ManageVehicleViewModel extends Core.PageViewModel
    {
        private _vehicleService: IVehicleService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _vehicles: Ext.IList<Vehicle>;
        private _vehicle: Vehicle;
        private _validator = new Validation.Validator<Vehicle>();


        public get Vehicle(): Vehicle { return this._vehicle; }
        public get Validator(): Validation.Validator<Vehicle> { return this._validator; }


        constructor(vehicleService: IVehicleService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            vehicles: Ext.IList<Vehicle>)
        {
            super();

            DefProg.For(vehicleService, "vehicleService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._vehicleService = vehicleService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._vehicles = vehicles;

            this.Initialize();
        }

        public CanSave(): boolean
        {
            this._validator.Validate(this._vehicle);

            if (this._validator.HasErrors) return false;

            return true;
        }

        //public Save(): void
        //{
        //    this.InitializeValidator();

        //    if (!this.CanSave()) return;

        //    if (this._vehicle.Id == null)
        //    {
        //        this._vehicleService.AddVehicle(this._vehicle).then(() => this._navigationService.Navigate("Main.Vehicles"));
        //    }
        //    else
        //    {
        //        this._vehicleService.UpdateVehicle(this._vehicle.VersionNo,
        //            this._vehicle.Id,
        //            this._vehicle.Description,
        //            this._vehicle.Type,
        //            this._vehicle.Make,
        //            this._vehicle.Model,
        //            this._vehicle.Lat,
        //            this._vehicle.Lon).then(() => this._navigationService.Navigate("Main.Vehicles"));
        //    }

        //}

        public async Save(): Promise<void>
        {
            this.InitializeValidator();

            if (!this.CanSave()) return;

            if (this._vehicle.Id == null)
            {
                await this._vehicleService.AddVehicleAsync(this._vehicle);
            }
            else
            {
                await this._vehicleService.UpdateVehicleAsync(
                    this._vehicle.VersionNo,
                    this._vehicle.Id,
                    this._vehicle.Description,
                    this._vehicle.Type,
                    this._vehicle.Make,
                    this._vehicle.Model,
                    this._vehicle.Lat,
                    this._vehicle.Lon);
            }

            this._navigationService.Navigate("Main.Vehicles");
        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Vehicles");
        }

        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));

            if (id == null || isNaN(id))
            {
                this._vehicle = new Vehicle();
            }
            else
            {
                var originVehicle = this._vehicles.FirstOrDefault(t => t.Id === id);
                if (originVehicle != null)
                {
                    this._vehicle = Ext.ObjectExt.Convert<Vehicle>(originVehicle, Vehicle);
                    return;
                }

                this._navigationService.NavigateReplaceHistory("Main.Vehicles");
            }
        }

        private InitializeValidator(): void
        {
            if (this._validator.HasRules) return;

            this._validator.For("Description").IsRequired();

            this._validator.For("Lat")
                .IsOptional()
                .UseValidationRule(new Validation.StringContainsOnlyNumbers).WithMessage("Lat can only be numbers");

            this._validator.For("Lon")
                .IsOptional()
                .UseValidationRule(new Validation.StringContainsOnlyNumbers).WithMessage("Lat can only be numbers");
        }
    }
}