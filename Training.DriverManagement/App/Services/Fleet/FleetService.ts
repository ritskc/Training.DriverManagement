module DriverManagement
{
    export class LocalFleetService implements IFleetService
    {
        private _fleet = [] as Ext.IList<Fleet>;


        public GetFleets(): Ext.IList<Fleet>
        {
            return this._fleet.Where(t => !t.IsDeleted);
        }

        public AddFleet(fleet: Fleet): void
        {
            if (fleet == null)
                throw new Exceptions.ArgumentNullException("fleet");

            fleet.Id = 1;

            var lastFleet = this._fleet.OrderByDescending(t => t.Id).FirstOrDefault();
            if (lastFleet != null) fleet.Id = lastFleet.Id + 1;

            this._fleet.Add(fleet);
        }

        public UpdateFleet(id: number, fleetName: string, fleetDescription: string): void
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            if (fleetName == null)
                throw new Exceptions.ArgumentNullException("fleetName");

            if (fleetDescription == null)
                throw new Exceptions.ArgumentNullException("fleetDescription");

            var fleet = this._fleet.FirstOrDefault(t => t.Id === id);

            if (fleet == null)
                throw new Exceptions.ApplicationException(Ext.StringExt.Format("Fleet with Id {0} was not found.", id));

            fleet.FleetName = fleetName;
            fleet.FleetDescription = fleetDescription;
        }

        public DeleteFleet(id: number): void
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            var fleet = this._fleet.FirstOrDefault(t => t.Id === id);

            if (fleet != null) fleet.IsDeleted = true;
        }
    }
}