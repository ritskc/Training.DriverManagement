using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Framework.Logging;
using Framework.WebApplication;

namespace Training.DriverManagement
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            WebApplication.Current.MvcSystem.UseBundleConfiguration(new BundleConfig());

            WebApplication.Current.Initialize();

            WebApplication.Current.Container.Resolve<ILog>().InfoAsync("Starting Training.DriverManagement!!!").Wait();
        }
    }
}
