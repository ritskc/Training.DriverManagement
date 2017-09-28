using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Training.DriverManagement.Controllers
{
    public class DefaultController : Controller
    {
        private readonly string _isDebug = "false";

        public DefaultController()
        {
#if DEBUG
            this._isDebug = "true";
#endif
        }


        [Route("")]
        [Route(MvcRoutes.Home)]
        public ActionResult Index()
        {
            this.ViewBag.IsDebug = this._isDebug;

            return View();
        }
    }
}