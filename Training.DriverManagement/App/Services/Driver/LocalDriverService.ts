module DriverManagement
{
    export class LocalDriverService implements IDriverService
    {
        private _drivers = [] as Ext.IList<Driver>;


        public GetDriversAsync(): Promise<Ext.IList<Driver>>
        {
            return Promise.resolve(this._drivers.Where(t => !t.IsDeleted));
        }

        public AddDriverAsync(driver: Driver): Promise<void>
        {
            if (driver == null)
                throw new Exceptions.ArgumentNullException("driver");

            driver.Id = 1;

            var lastDriver = this._drivers.OrderByDescending(t => t.Id).FirstOrDefault();
            if (lastDriver != null) driver.Id = lastDriver.Id + 1;

            this._drivers.Add(driver);

            return Promise.resolve();
        }

        public UpdateDriverAsync(versionNo: number, id: number, firstName: string, lastName: string, phone: string, email: string)
            : Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            if (firstName == null)
                throw new Exceptions.ArgumentNullException("firstName");

            if (lastName == null)
                throw new Exceptions.ArgumentNullException("lastName");

            if (phone == null)
                throw new Exceptions.ArgumentNullException("phone");

            var driver = this._drivers.FirstOrDefault(t => t.Id === id);

            if (driver == null)
                throw new Exceptions.ApplicationException(Ext.StringExt.Format("Driver with Id {0} was not found.", id));

            driver.FirstName = firstName;
            driver.LastName = lastName;
            driver.Phone = phone;
            driver.Email = email;

            return Promise.resolve();
        }

        public DeleteDriverAsync(id: number): Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            var driver = this._drivers.FirstOrDefault(t => t.Id === id);

            if (driver != null) driver.IsDeleted = true;

            return Promise.resolve();
        }
    }
}