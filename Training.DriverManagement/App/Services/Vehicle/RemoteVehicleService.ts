module DriverManagement
{
    @Core.Inject("DialogService", "DataService")
    export class RemoteVehicleService implements IVehicleService
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


        public async GetVehiclesAsync(): Promise<Ext.IList<Vehicle>>
        {
            this._dialogService.ShowLoadingScreen();
            var data = await this._dataService
                .GetAsync<Models.CollectionHypermediaModel<Vehicle>>(this._apiUrl + "Query/Vehicles");
                this._dialogService.HideLoadingScreen();

            return data.Items;
        }

        public async AddVehicleAsync(vehicle: Vehicle): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PostVoidAsync(this._apiUrl + "Command/CreateVehicle", vehicle);
            this._dialogService.HideLoadingScreen();
        }

        public async UpdateVehicleAsync(versionNo: number, id: number, description: string, type: string, make: string, model: string,
            lat: number, lon: number): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PutVoidAsync(this._apiUrl + "Command/UpdateVehicle",
                {
                    VersionNo: versionNo,
                    Id: id,
                    Description: description,
                    Type: type,
                    Make: make,
                    Model: model,
                    Lat: lat,
                    Lon: lon
                });
            this._dialogService.HideLoadingScreen();
        }

        public async DeleteVehicleAsync(versionNo: number, id: number): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.DeleteVoidAsync(this._apiUrl + "Command/DeleteVehicle",
                { VersionNo: versionNo, Id: id });
            this._dialogService.HideLoadingScreen();
        }
    }
}