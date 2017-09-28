module DriverManagement
{
    export class LocalVehicleService implements IVehicleService
    {
        private _vehicles = [] as Ext.IList<Vehicle>;


        public GetVehiclesAsync(): Promise<Ext.IList<Vehicle>>
        {
            return Promise.resolve(this._vehicles.Where((t) => !t.IsDeleted));
        }

        public AddVehicleAsync(vehicle: Vehicle): Promise<void>
        {
            if(vehicle == null)
                throw new Exceptions.ArgumentNullException("vehicle");

            vehicle.Id = 1;

            var lastVehicle = this._vehicles.OrderByDescending((t) => t.Id).FirstOrDefault();
            if(lastVehicle != null)
                vehicle.Id = lastVehicle.Id + 1;
            
            this._vehicles.Add(vehicle);

            return Promise.resolve();
        }

        public UpdateVehicleAsync(versionNo: number, id: number, description: string, type: string, make: string, model: string,
            lat: number, lon: number): Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");

            if(description == null)
                throw new Exceptions.ArgumentNullException("description");
            
            var vehicle = this._vehicles.FirstOrDefault(t => t.Id === id);

            if(vehicle == null)
                throw new Exceptions.ApplicationException(Ext.StringExt.Format("Vehicle with id: {0} not found.", id));
            
            vehicle.Description = description;
            vehicle.Type = type;
            vehicle.Make = make;
            vehicle.Model = model;
            vehicle.Lat = lat;
            vehicle.Lon = lon;

            return Promise.resolve();
        }

        public DeleteVehicleAsync(id: number): Promise<void>
        {
            if (id == null)
                throw new Exceptions.ArgumentNullException("id");
            
            var vehicle = this._vehicles.FirstOrDefault(t => t.Id === id);
            if (vehicle != null)
                vehicle.IsDeleted = true;

            return Promise.resolve();
        }
    }
}