module DriverManagement
{
    @Core.Inject("DriverService")
    export class DriversResolver extends Core.Resolver<Ext.IList<Driver>>
    {
        private _driverService: IDriverService;


        constructor(driverService: IDriverService)
        {
            super();

            DefProg.For(driverService, "driverService").IsNotNull();

            this._driverService = driverService;
        }


        protected async ResolveAsync(stateParams: Models.Dictionary<any>): Promise<Ext.IList<Driver>>
        {
            try
            {
                return await this._driverService.GetDriversAsync();
            }
            catch (e)
            {
                throw e;
            } 
        }
    }
}