module DriverManagement
{
    export interface IUserService
    {
        GetUsersAsync(): Promise<Ext.IList<User>>;
        AddUserAsync(user: User): Promise<void>;
        UpdateUserAsync(versionNo: number, id: number, email: string, firstname: string, lastname: string, phoneno: string): Promise<void>;
        DeleteUserAsync(versionNo: number, id: number): Promise<void>;
        //SearchUsers(searchstring: string): Ext.IList<User>;
    }
}