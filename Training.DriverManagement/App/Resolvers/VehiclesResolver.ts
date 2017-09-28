module DriverManagement
{
    @Core.Inject("VehicleService")
    export class VehiclesResolver extends Core.Resolver<Ext.IList<Vehicle>>
    {
        private _vehicleService: IVehicleService;


        constructor(vehicleService: IVehicleService)
        {
            super();

            DefProg.For(vehicleService, "vehicleService").IsNotNull();

            this._vehicleService = vehicleService;
        }


        protected async ResolveAsync(stateParams: Models.Dictionary<any>): Promise<Ext.IList<Vehicle>>
        {
            return this._vehicleService.GetVehiclesAsync();
        }
    }
}