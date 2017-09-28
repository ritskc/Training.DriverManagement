module DriverManagement
{
    @Core.Inject("FleetService")
    export class FleetsResolver extends Core.Resolver<Ext.IList<Fleet>>
    {
        private _fleetService: IFleetService;


        constructor(fleetService: IFleetService)
        {
            super();

            DefProg.For(fleetService, "fleetService").IsNotNull();

            this._fleetService = fleetService;
        }


        protected ResolveAsync(stateParams: Models.Dictionary<any>): Promise<Ext.IList<Fleet>>
        {
            return this._fleetService.GetFleetsAsync();
        }
    }
}