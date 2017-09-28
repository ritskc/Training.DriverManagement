module DriverManagement
{
    @Core.Inject("UserService")
    export class UsersResolver extends Core.Resolver<Ext.IList<User>>
    {
        private _userService: IUserService;


        constructor(userService: IUserService)
        {
            super();

            DefProg.For(userService, "userService").IsNotNull();

            this._userService = userService;
        }


        protected ResolveAsync(stateParams: Models.Dictionary<any>): Promise<Ext.IList<User>>
        {
            return this._userService.GetUsersAsync();
        }
    }
}