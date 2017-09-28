using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using Framework.Logging;
using Framework.WebApplication;

namespace Training.DriverManagement.Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            WebApplication.Current.WebApiSystem
                .UseCommandQueryUrl("http://localhost:51806/")
                .EnableCors();

            WebApplication.Current.Initialize();

            WebApplication.Current.Container.Resolve<ILog>().InfoAsync("Starting Training.DriverManagement.Api !!!").Wait();
        }
    }
}
