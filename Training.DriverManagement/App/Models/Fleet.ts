module DriverManagement
{
    export class Fleet
    {
        public VersionNo: number;
        public Id: number;
        public Name: string;
        public Description: string;
        public IsDeleted: boolean;
        public Vehicles: Ext.IList<Vehicle>;

        constructor()
        {
            this.Vehicles = [] as Ext.IList<Vehicle>;
        }
    }
}