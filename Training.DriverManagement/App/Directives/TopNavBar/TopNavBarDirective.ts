module DriverManagement
{
    export class TopNavBarDirective extends Core.ComponentDirective
    {
        constructor()
        {
            super();

            this.View = "TopNavBar/TopNavBarDirectiveView.html";
            this.ViewModel = TopNavBarDirectiveViewModel;
        }
    }
}