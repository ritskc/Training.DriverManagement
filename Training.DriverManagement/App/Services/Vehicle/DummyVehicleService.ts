module DriverManagement
{
    export class DummyVehicleService implements IVehicleService
    {
        public GetVehicles(): Ext.IList<Vehicle>
        {
            return [
                    {
                        Description: "Vehicle1",
                        Id: 1
                    },
                    {
                        Description: "Vehicle2",
                        Id: 2
                    },
                    {
                        Description: "Vehicle3",
                        Id: 3
                    },
                    {
                        Description: "Vehicle4",
                        Id: 4
                    },
                    {
                        Description: "Vehicle5",
                        Id: 5
                    },
                    {
                        Description: "Vehicle6",
                        Id: 6
                    },
                    {
                        Description: "Vehicle7",
                        Id: 7
                    },
                    {
                        Description: "Vehicle8",
                        Id: 8
                    },
                    {
                        Description: "Vehicle9",
                        Id: 9
                    },
                    {
                        Description: "Vehicle10",
                        Id: 10
                    }
                ] as Ext.IList<Vehicle>;
        }
    }
}