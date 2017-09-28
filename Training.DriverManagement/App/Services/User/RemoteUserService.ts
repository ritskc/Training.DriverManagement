module DriverManagement
{
    @Core.Inject("DialogService", "DataService")
    export class RemoteUserService implements IUserService
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


        public async GetUsersAsync(): Promise<Ext.IList<User>>
        {
            this._dialogService.ShowLoadingScreen();
            var data = await this._dataService
                .GetAsync<Models.CollectionHypermediaModel<User>>(this._apiUrl + "Query/Users");
                this._dialogService.HideLoadingScreen();

            return data.Items;
        }

        public async AddUserAsync(user: User): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PostVoidAsync(this._apiUrl + "Command/CreateUser", user);
            this._dialogService.HideLoadingScreen();
        }

        public async UpdateUserAsync(versionNo: number, id: number, email: string, firstName: string, lastName: string, phoneNo: string)
            : Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.PutVoidAsync(this._apiUrl + "Command/UpdateUser",
                {
                    VersionNo: versionNo,
                    Id: id,
                    Email: email,
                    FirstName: firstName,
                    LastName: lastName,
                    PhoneNo: phoneNo
                });
            this._dialogService.HideLoadingScreen();
        }

        public async DeleteUserAsync(versionNo: number, id: number): Promise<void>
        {
            this._dialogService.ShowLoadingScreen();
            await this._dataService.DeleteVoidAsync(this._apiUrl + "Command/DeleteUser",
                { VersionNo: versionNo, Id: id });
            this._dialogService.HideLoadingScreen();
        }
    }
}