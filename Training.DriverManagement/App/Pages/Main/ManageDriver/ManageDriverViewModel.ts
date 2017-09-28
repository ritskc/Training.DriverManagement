module DriverManagement
{
    @Core.Inject("DriverService", "NavigationService", "DialogService")
    @Core.Resolve("Drivers")
    export class ManageDriverViewModel extends Core.PageViewModel
    {
        private _driverService: IDriverService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _drivers: Ext.IList<Driver>;
        private _driver: Driver;
        private _validator = new Validation.Validator<Driver>();


        public get Driver(): Driver { return this._driver; }
        public get Validator(): Validation.Validator<Driver> { return this._validator; }


        constructor(driverService: IDriverService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            drivers: Ext.IList<Driver>)
        {
            super();

            DefProg.For(driverService, "driverService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._driverService = driverService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._drivers = drivers;

            this.Initialize();
        }


        public CanSave(): boolean
        {
            this._validator.Validate(this._driver);

            if (this._validator.HasErrors) return false;

            return true;
        }

        public async Save(): Promise<void>
        {
            this.InitializeValidator();

            if (!this.CanSave()) return;

            if (this._driver.Id != null)
            {
                await this._driverService.UpdateDriverAsync(this._driver.VersionNo, this._driver.Id, this._driver.FirstName,
                    this._driver.LastName, this._driver.Phone, this._driver.Email);
            }
            else
            {
                await this._driverService.AddDriverAsync(this._driver);
            }

            this._navigationService.Navigate("Main.Drivers");
        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Drivers");
        }


        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));

            if (id == null || isNaN(id))
            {
                this._driver = new Driver();
            }
            else
            {
                var originalDriver = this._drivers.FirstOrDefault(t => t.Id === id);
                if (originalDriver != null)
                {
                    this._driver = Ext.ObjectExt.Convert<Driver>(originalDriver, Driver);
                    return;
                }

                this._navigationService.NavigateReplaceHistory("Main.Drivers");
            }
        }

        private InitializeValidator(): void
        {
            if (this._validator.HasRules) return;

            this._validator.For("FirstName")
                .IsRequired()
                .UseValidationRule(new Validation.StringHasMaxLength(10));

            this._validator.For("LastName")
                .IsRequired()
                .UseValidationRule(new Validation.StringHasMaxLength(15));

            this._validator.For("Phone")
                .IsRequired()
                .UseValidationRule(new Validation.StringIsPhoneOrFaxNumber());

            this._validator.For("Email")
                .IsOptional()
                .UseValidationRule(new Validation.StringIsEmail());
        }
    }
}