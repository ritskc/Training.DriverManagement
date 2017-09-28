module DriverManagement
{
    @Core.Inject("DialogService", "DataService")
    export class RemoteFleetService implements IFleetService
    {
        private _dialogService: Services.IDialogService;
        private _dataService: Services.IDataService;
        private _qService: angular.IQService;
        private _apiUrl = "http://localhost:51806/";


        constructor(dialogService: Services.IDialogService, dataService: Services.IDataService)
        {
            DefProg.For(dialogService, "dialogService").IsNotNull();
            DefProg.For(dataService, "dataService").IsNotNull();

            this._dialogService = dialogService;
            this._dataService = dataService;
        }


        public async GetFleetsAsync(): Promise<Ext.IList<Fleet>>
        {
            this._dialogService.ShowLoadingScreen();
            var data = await this._dataService
                .GetAsync<Models.CollectionHypermediaModel<Fleet>>(this._apiUrl + "Query/Fleets");
                this._dialogService.HideLoadingScreen();
            return data.Items;
        }

        public async AddFleetAsync(fleet: Fleet): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PostVoidAsync(this._apiUrl + "Command/CreateFleet", fleet);
            this._dialogService.HideLoadingScreen();
        }

        public async UpdateFleetAsync(versionNo: number, id: number, name: string, description: string): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PutVoidAsync(this._apiUrl + "Command/UpdateFleet",
                {
                    VersionNo: versionNo,
                    Id: id,
                    Name: name,
                    Description: description
                });
            this._dialogService.HideLoadingScreen();
        }

        public async DeleteFleetAsync(versionNo: number, id: number): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.DeleteVoidAsync(this._apiUrl + "Command/DeleteFleet",
                { VersionNo: versionNo, Id: id });
            this._dialogService.HideLoadingScreen();                                                     
        }

        public async ManageFleetVehiclesAsync(versionNo: number, fleetId: number, assignedVehicles: Ext.IList<Vehicle>)
            : Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PutVoidAsync(this._apiUrl + "Command/ManageFleetVehicles",
                { VersionNo: versionNo, FleetId: fleetId, AssignedVehicles: assignedVehicles });
            this._dialogService.HideLoadingScreen();
        }
    }
}