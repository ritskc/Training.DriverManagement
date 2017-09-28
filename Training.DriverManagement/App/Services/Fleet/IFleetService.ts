module DriverManagement
{
    export interface IFleetService
    {
        GetFleetsAsync(): Promise<Ext.IList<Fleet>>;
        AddFleetAsync(fleet: Fleet): Promise<void>;
        UpdateFleetAsync(versionNo: number, id: number, name: string, description: string): Promise<void>;
        DeleteFleetAsync(versionNo: number, id: number): Promise<void>;
        ManageFleetVehiclesAsync(versionNo: number, fleetId: number, assignedVehilces: Ext.IList<Vehicle>): Promise<void>;
    }

}