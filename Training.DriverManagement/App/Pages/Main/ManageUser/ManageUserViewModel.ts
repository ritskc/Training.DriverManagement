module DriverManagement
{
    @Core.Inject("UserService", "NavigationService", "DialogService")
    @Core.Resolve("Users")
    export class ManageUserViewModel extends Core.PageViewModel
    {
        private _userService: IUserService;
        private _navigationService: Services.INavigationService;
        private _dialogService: Services.IDialogService;

        private _users: Ext.IList<User>;
        private _user: User;
        private _validator = new Validation.Validator<User>();


        public get User(): User { return this._user }
        public get Validator(): Validation.Validator<User> { return this._validator }


        constructor(userService: IUserService, navigationService: Services.INavigationService, dialogService: Services.IDialogService,
            users: Ext.IList<User>)
        {
            super();

            DefProg.For(userService, "userService").IsNotNull();
            DefProg.For(navigationService, "navigationService").IsNotNull();
            DefProg.For(dialogService, "dialogService").IsNotNull();
            DefProg.For(users, "users").IsNotNull();

            this._userService = userService;
            this._navigationService = navigationService;
            this._dialogService = dialogService;
            this._users = users;

            this.Initialize();
        }

        public async Save(): Promise<void>
        {
            this.InitializeValidator();

            if (!this.CanSave()) return;

            if (this._user.Id == null)
            {
                await this._userService.AddUserAsync(this._user);
            }
            else
            {
                await this._userService.UpdateUserAsync(
                    this._user.VersionNo,
                    this._user.Id,
                    this._user.Email,
                    this._user.FirstName,
                    this._user.LastName,
                    this._user.PhoneNo);
            }

            this._navigationService.Navigate("Main.Users");
        }

        public Cancel(): void
        {
            this._navigationService.Navigate("Main.Users");
        }

        private Initialize(): void
        {
            var id = parseInt(this._navigationService.GetStateParam("id"));

            if (id == null || isNaN(id))
            {
                this._user = new User();
            }
            else
            {
                var originalUser = this._users.FirstOrDefault(t => t.Id === id);
                if (originalUser != null)
                {
                    this._user = Ext.ObjectExt.Convert<User>(originalUser, User);
                    return;
                }
                this._navigationService.NavigateReplaceHistory("Main.Users");
            }
        }

        private InitializeValidator(): void
        {
            if (this._validator.HasRules) return;


            this._validator.For("Email")
                .IsRequired()
                .UseValidationRule(new Validation.StringIsEmail())
                .UseValidationRule(new Validation.StringIsNotIn(
                    this._users.Where(t => t.Id !== this._user.Id).Select(t => t.Email)))
                .WithMessage("Emails is already in use");

            this._validator.For("FirstName")
                .IsRequired()
                .UseValidationRule(new Validation.StringHasMaxLength(10));

            this._validator.For("LastName")
                .IsRequired()
                .UseValidationRule(new Validation.StringHasMaxLength(15));

            this._validator.For("PhoneNo")
                .IsOptional()
                .UseValidationRule(new Validation.StringIsPhoneOrFaxNumber());
        }

        public CanSave(): boolean
        {
            this._validator.Validate(this._user);

            return this._validator.IsValid;
        }
    }
}