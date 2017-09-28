module DriverManagement
{
    @Core.Inject("DriverService", "NavigationService", "DialogService")
    @Core.Resolve("Drivers")
    export class DriversViewModel extends Core.PageViewModel
    {
        private _driverService: IDriverService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;
        

        private _drivers: Ext.IList<Driver>;


        public get Drivers(): Ext.IList<Driver> { return this._drivers; }


        constructor(driverService: IDriverService, navigationService: Services.INavigationService,
            dialogService: Services.IDialogService, drivers: Ext.IList<Driver>)
        {
            super();

            DefProg.For(driverService, "driverService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._driverService = driverService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._drivers = drivers;
        }


        public AddDriver(): void
        {
            this._navigationService.Navigate("Main.ManageDriver");
        }

        public EditDriver(driver: Driver): void
        {
            if (driver == null)
                throw new Exceptions.ArgumentNullException("driver");

            this._navigationService.Navigate("Main.ManageDriver", {id: driver.Id});
        }

        public async DeleteDriver(driver: Driver): Promise<void>
        {
            if (driver == null)
                throw new Exceptions.ArgumentNullException("driver");

            if (!confirm("Are you sure?")) return;

            try
            {
                await this._driverService.DeleteDriverAsync(driver.VersionNo, driver.Id);
            }
            catch (e)
            {
                this._dialogService.ShowErrorMessage("Failed to delete driver.");
            }
            finally
            {
                this._drivers = await this._driverService.GetDriversAsync();
            }
        }


//#region "Some R&D"

        //public async DeleteDriver(driver: Driver): Promise<void>
        //{
        //    //if (driver == null)
        //    //    throw new Exceptions.ArgumentNullException("driver");

        //    //if (!confirm("Are you sure?")) return;


        //    //try
        //    //{
        //    //    //console.log("Deleting driver 6");
        //    //    await this.Convert(this._driverService.DeleteDriver(driver.VersionNo, driver.Id));
        //    //    this._drivers = await this.Convert(this._driverService.GetDrivers());
        //    //}
        //    //catch (e)
        //    //{
        //    //    console.log("Caught exception", e);

        //    //    this._dialogService.ShowErrorMessage("Failed to delete driver.")
        //    //}
        //    //finally
        //    //{
        //    //    console.log("Executing finally");

        //    //    console.log("Getting drivers");
        //    //    this._drivers = await this.Convert(this._driverService.GetDrivers());
        //    //    console.log("Processed drivers");
        //    //}



        //    //this._rootScope.$apply();

        //    //var p1 = this.Convert(this._driverService.DeleteDriver(driver.VersionNo, driver.Id));
        //    //await p1;
        //    //var p2 = this.Convert(this._driverService.GetDrivers());

        //    //var drivers = await p2;
        //    //console.log(drivers);
        //}


        //private async ExecuteTimeoutTest(): Promise<void>
        //{
        //    console.log("Hello");

        //    for (let i = 0; i < 3; i++)
        //    {
        //        await this.DelayTimeout(500);
        //        console.log("timeout", i);
        //    }

        //    console.log("World!");
        //}

        //private async ExecuteIntervalTest(): Promise<void>
        //{
        //    console.log("Hello");

        //    for (let i = 0; i < 3; i++)
        //    {
        //        await this.DelayInterval(500);
        //        console.log("interval", i);
        //    }

        //    console.log("World!");
        //}


        //private DelayTimeout(milliseconds: number): Promise<void>
        //{
        //    return new Promise<void>(resolve =>
        //    {
        //        setTimeout(resolve, milliseconds);
        //    });
        //}

        //private DelayInterval(milliseconds: number): Promise<void>
        //{
        //    return this.Convert(this._intervalService(() => {}, milliseconds, 1));

        //    //var promise = new Promise<void>(resolve =>
        //    //{
        //    //    this._intervalService(() =>)
        //    //});

        //    //var promise = this._intervalService()

        //    //return new Promise<void>(resolve =>
        //    //{
        //    //    setTimeout(resolve, milliseconds);
        //    //});
        //}

        //private Convert<T>(qPromise: angular.IPromise<T>): Promise<T>
        //{
        //    return new Promise<T>((resolve, reject) =>
        //    {
        //        qPromise.then(
        //            (result: T) =>
        //            {
        //                resolve(result);
        //                this._intervalService(() => {}, 1, 1);

        //                //this._intervalService(() => resolve(result), 1, 1);
        //                //resolve(result);
        //                //this._rootScope.$apply();
        //            },
        //            (e) =>
        //            {
        //                reject(e);
        //                this._intervalService(() => {}, 1, 1);

        //                //this._intervalService(() => reject(e), 1, 1);
        //                /*reject(e)*/;
        //                //this._rootScope.$apply();
        //            });
        //    });
        //}

//#endregion
    }
}