module DriverManagement
{
    export class LocalFleetService implements IFleetService
    {
        private _fleet = [] as Ext.IList<Fleet>;


        public GetFleetsAsync(): Promise<Ext.IList<Fleet>>
        {
            return Promise.resolve(this._fleet.Where(t => !t.IsDeleted));
        }

        public AddFleetAsync(fleet: Fleet): Promise<void>
        {
            if (fleet == null)
                throw new Exceptions.ArgumentNullException("fleet");

            fleet.Id = 1;

            var lastFleet = this._fleet.OrderByDescending(t => t.Id).FirstOrDefault();
            if (lastFleet != null) fleet.Id = lastFleet.Id + 1;

            this._fleet.Add(fleet);

            return Promise.resolve();
        }

        public UpdateFleetAsync(versionNo: number, id: number, name: string, description: string, p3?: string): Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            if (name == null)
                throw new Exceptions.ArgumentNullException("fleetName");

            if (description == null)
                throw new Exceptions.ArgumentNullException("fleetDescription");

            var fleet = this._fleet.FirstOrDefault(t => t.Id === id);

            if (fleet == null)
                throw new Exceptions.ApplicationException(Ext.StringExt.Format("Fleet with Id {0} was not found.", id));

            fleet.Name = name;
            fleet.Description = description;

            return Promise.resolve();
        }

        public DeleteFleetAsync(id: number): Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            var fleet = this._fleet.FirstOrDefault(t => t.Id === id);

            if (fleet != null) fleet.IsDeleted = true;

            return Promise.resolve();
        }

        public ManageFleetVehiclesAsync(versionNo: number, fleetId: number, assignedVehilces: Ext.IList<Vehicle>)
            : Promise<void>
        {
            throw new Error("Not implemented");
        }
    }
}