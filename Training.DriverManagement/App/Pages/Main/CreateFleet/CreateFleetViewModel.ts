module DriverManagement
{
    @Core.Inject("FleetService", "NavigationService")
    export class CreateFleetViewModel extends Core.PageViewModel
    {
        private _fleetService: IFleetService;
        private _navigationService: Services.INavigationService;

        private _fleet: Fleet;
        private _validator = new Validation.Validator<Fleet>();


        public get Fleet(): Fleet { return this._fleet; }
        public get Validator(): Validation.Validator<Fleet> { return this._validator; }


        constructor(fleetService: IFleetService, navigationService: Services.INavigationService)
        {
            super();

            if (fleetService == null)
                throw new Exceptions.ArgumentNullException("fleetService");

            if (navigationService == null)
                throw new Exceptions.ArgumentNullException("navigationService");

            this._fleetService = fleetService;
            this._navigationService = navigationService;

            this.Initialize();
        }


        public CanSave(): boolean
        {
            this._validator.Validate(this._fleet);

            if (this._validator.HasErrors) return false;

            return true;
        }

        public Save(): void
        {
            this.InitializeValidator();

            if (!this.CanSave()) return;

            if (this._fleet.Id != null)
            {
                this._fleetService.UpdateFleet(this._fleet.Id, this._fleet.FleetName, this._fleet.FleetDescription);
            }

            else
            {
                this._fleetService.AddFleet(this._fleet);
            }

            this._navigationService.Navigate("Main.Fleet");
        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Fleet");
        }


        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));

            console.log("id", id);

            if (id == null || isNaN(id))
            {
                this._fleet = new Fleet();
            }
            else
            {
                var originalFleet = this._fleetService.GetFleets().FirstOrDefault(t => t.Id === id);
                if (originalFleet != null)
                {
                    this._fleet = Ext.ObjectExt.Convert<Fleet>(originalFleet, Fleet);
                    return;
                }

                this._navigationService.NavigateReplaceHistory("Main.Fleet");
            }
        }

        private InitializeValidator(): void
        {
            if (this._validator.HasRules) return;

            this._validator.For("FleetName")
                .IsRequired()
                .UseValidationRule(new Validation.StringHasMaxLength(15));

            this._validator.For("FleetDescription")
                .IsOptional()
                .UseValidationRule(new Validation.StringHasMaxLength(1024));
        }
    }
}