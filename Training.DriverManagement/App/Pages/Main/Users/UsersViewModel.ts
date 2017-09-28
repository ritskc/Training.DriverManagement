module DriverManagement
{
    @Core.Inject("UserService", "NavigationService", "DialogService")
    @Core.Resolve("Users")
    @Core.State({})
    export class UsersViewModel extends Core.PageViewModel
    {
        private _userService: IUserService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;
        
        private _users: Ext.IList<User>;
        private _state: IState;
        private _filteredUsers: Ext.IList<User>;


        public get Users(): Ext.IList<User> { return this._filteredUsers; }

        public get SearchString(): string { return this._state.SearchString; }
        public set SearchString(value: string)
        {
            this._state.SearchString = value;
            this.SearchUsers();
        }


        constructor(userService: IUserService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            users: Ext.IList<User>, state: IState)
        {
            super();

            DefProg.For(userService, "userService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();

            this._userService = userService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._users = users;
            this._state = state;
            this.SearchString = state.SearchString;
        }

        public AddUser(): void
        {
            this._navigationService.Navigate("Main.ManageUser");
        }

        public EditUser(user: User): void
        {
            if (user == null)
                throw new Exceptions.ArgumentNullException("user");          
           
            this._navigationService.Navigate("Main.ManageUser", { id: user.Id });
        }

        public async DeleteUser(user: User): Promise<void>
        {
            if (user == null)
                throw new Exceptions.ArgumentNullException("user");

            if (!confirm("Are you sure you want to delete?")) return;
            
            try
            {
                await this._userService.DeleteUserAsync(user.VersionNo, user.Id);
            }
            catch (e)
            {
                this._dialogService.ShowErrorMessage("Failed to delete user.");
            }
            finally
            {
                this._users = await this._userService.GetUsersAsync();
            }
        }


        private SearchUsers(): void
        {
            this._filteredUsers = Ext.StringExt.HasValue(this.SearchString)
                 ? this._users.Where(t => Ext.StringExt.Contains(t.Email.toLowerCase(), this.SearchString.toLowerCase()) ||
                                Ext.StringExt.Contains(t.FirstName.toLowerCase(), this.SearchString.toLowerCase())).ToList()
                 : this._users.ToList();
        }
    }

    interface IState
    {
        SearchString: string;
    }
}