module DriverManagement
{
    export interface IVehicleService
    {
        GetVehiclesAsync(): Promise<Ext.IList<Vehicle>>;
        AddVehicleAsync(vehicle: Vehicle): Promise<void>;
        UpdateVehicleAsync(versionNo: number, id: number, description: string, type: string, make: string, model: string, lat: number, lon: number): Promise<void>;
        DeleteVehicleAsync(versionNo: number, id: number): Promise<void>;
    }
}