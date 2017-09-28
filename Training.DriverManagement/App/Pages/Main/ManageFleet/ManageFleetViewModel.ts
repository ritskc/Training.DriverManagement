module DriverManagement
{
    @Core.Inject("FleetService", "NavigationService", "DialogService")
    @Core.Resolve("Fleets")
    export class ManageFleetViewModel extends Core.PageViewModel
    {
        private _fleetService: IFleetService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _fleets: Ext.IList<Fleet>;
        private _fleet: Fleet;
        private _validator = new Validation.Validator<Fleet>();


        public get Fleet(): Fleet { return this._fleet; }
        public get Validator(): Validation.Validator<Fleet> { return this._validator; }


        constructor(fleetService: IFleetService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            fleets: Ext.IList<Fleet>)
        {
            super();

            DefProg.For(fleetService, "fleetService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._fleetService = fleetService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._fleets = fleets;

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
                this._fleetService.UpdateFleetAsync(this._fleet.VersionNo, this._fleet.Id, this._fleet.Name, this._fleet.Description).then(() => this._navigationService.Navigate("Main.Fleets"));
            }

            else
            {
                this._fleetService.AddFleetAsync(this._fleet).then(() => this._navigationService.Navigate("Main.Fleets"));
            }

        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Fleets");
        }


        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));

            if (id == null || isNaN(id))
            {
                this._fleet = new Fleet();
            }
            else
            {
                var originalFleet = this._fleets.FirstOrDefault(t => t.Id === id);
                if (originalFleet != null)
                {
                    this._fleet = Ext.ObjectExt.Convert<Fleet>(originalFleet, Fleet);
                    return;
                }

                this._navigationService.NavigateReplaceHistory("Main.Fleets");
            }
        }

        private InitializeValidator(): void
        {
            if (this._validator.HasRules) return;

            this._validator.For("Name")
                .IsRequired()
                .UseValidationRule(new Validation.StringHasMaxLength(15));

            this._validator.For("Description")
                .IsOptional()
                .UseValidationRule(new Validation.StringHasMaxLength(1024));
        }
    }
}