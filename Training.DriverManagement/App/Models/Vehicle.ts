module DriverManagement
{
    export class Vehicle
    {
        public VersionNo: number;
        public Id: number;
        public Description: string;
        public Type: string;
        public Make: string;
        public Model: string;
        public IsDeleted: boolean;
        public Lat: number;
        public Lon: number;
        public Fleets: Ext.IList<Fleet>;

        constructor()
        {
            this.Fleets = [] as Ext.IList<Fleet>;
        }
    }
}