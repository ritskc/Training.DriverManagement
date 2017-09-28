module DriverManagement
{
    export class LocalUserService implements IUserService
    {
        private _users = [] as Ext.IList<User>;


        public GetUsersAsync(): Promise<Ext.IList<User>>
        {
            return Promise.resolve(this._users.Where(t => !t.IsDeleted));
        }

        public AddUserAsync(user: User): Promise<void>
        {
            if (user == null)
                throw new Exceptions.ArgumentNullException("user");
            
            if (this._users.Any(t => t.Email === user.Email))
                throw new Exceptions.ApplicationException(Ext.StringExt.Format("User with Email {0} already exist.", user.Email)); 

            user.Id = 1;
            var lastuser = this._users.OrderByDescending(t => t.Id).FirstOrDefault();
            if (lastuser != null) user.Id = lastuser.Id + 1;

            this._users.Add(user);

            return Promise.resolve();
        }

        public UpdateUserAsync(versionNo: number, id: number, email: string, firstname: string, lastname: string, phoneno: string)
            : Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            if (email == null)
                throw new Exceptions.ArgumentNullException("email");

            if (firstname == null)
                throw new Exceptions.ArgumentNullException("firstname");

            if (lastname == null)
                throw new Exceptions.ArgumentNullException("lastname");

            var user = this._users.FirstOrDefault(t => t.Id === id);

            //need to implement email id check

            if (user == null)
                throw new Exceptions.ApplicationException(Ext.StringExt.Format("User with Id{0} was not found.", id));

            user.Email = email;
            user.FirstName = firstname;
            user.LastName = lastname;
            user.PhoneNo = phoneno;

            return Promise.resolve();
        }

        public DeleteUserAsync(id: number): Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            var user = this._users.FirstOrDefault(t => t.Id === id);

            if (user != null) user.IsDeleted = true;

            return Promise.resolve();
        }

        //public SearchUsers(searchstring: string): Ext.IList<User>
        //{
        //    return this._users.Where(t => !t.IsDeleted && t.FirstName.indexOf(searchstring) >=0);
        //}
    }
}