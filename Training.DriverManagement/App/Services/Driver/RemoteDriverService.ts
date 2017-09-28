module DriverManagement
{
    @Core.Inject("DialogService", "DataService")
    export class RemoteDriverService implements IDriverService
    {
        private _dialogService: Services.IDialogService;
        private _dataService: Services.IDataService;
        private _apiUrl = "http://localhost:51806/";
        

        constructor(dialogService: Services.IDialogService, dataService: Services.IDataService)
        {
            DefProg.For(dialogService, "dialogService").IsNotNull();
            DefProg.For(dataService, "dataService").IsNotNull();

            this._dialogService = dialogService;
            this._dataService = dataService;
        }


        public async GetDriversAsync(): Promise<Ext.IList<Driver>>
        {
            this._dialogService.ShowLoadingScreen();
            var data = await this._dataService
                .GetAsync<Models.CollectionHypermediaModel<Driver>>(this._apiUrl + "Query/Drivers");
            this._dialogService.HideLoadingScreen();
            return data.Items;
        }

        public async AddDriverAsync(driver: Driver): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PostVoidAsync(this._apiUrl + "Command/CreateDriver", driver);
            this._dialogService.HideLoadingScreen();
        }

        public async UpdateDriverAsync(versionNo: number, id: number, firstName: string, lastName: string, phone: string, email: string)
            : Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PutVoidAsync(this._apiUrl + "Command/UpdateDriver",
                {
                    VersionNo: versionNo,
                    Id: id,
                    FirstName: firstName,
                    LastName: lastName,
                    Phone: phone,
                    Email: email
                });
            this._dialogService.HideLoadingScreen();
        }

        public async DeleteDriverAsync(versionNo:number,id: number): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService
                .DeleteVoidAsync(this._apiUrl + "Command/DeleteDriver", { VersionNo: versionNo, Id: id });
            this._dialogService.HideLoadingScreen();
        }
    }
}