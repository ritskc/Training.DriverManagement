module DriverManagement
{
    export interface IDriverService
    {
        GetDriversAsync(): Promise<Ext.IList<Driver>>;
        AddDriverAsync(driver: Driver): Promise<void>;
        UpdateDriverAsync(versionNo: number, id: number, firstName: string, lastName: string, phone: string, email: string): Promise<void>;
        DeleteDriverAsync(versionNo: number, id: number): Promise<void>;
    }
}