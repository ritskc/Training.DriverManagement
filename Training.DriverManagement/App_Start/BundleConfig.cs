using System.Web.Optimization;
using Framework.WebApplication.Mvc.Bundling;

namespace Training.DriverManagement
{
    public class BundleConfig : BundleConfiguration
    {
        public BundleConfig()
        {
#if DEBUG
            this.IsDebug = true;
#endif
        }


        protected override void ConfigureStyleBundles(BundleCollection bundles, IItemTransform cssRewriteUrlTransform)
        {
            bundles.Add(new StyleBundle("~/Bundles/Styles")
                .Include("~/Content/Styles/bootstrap.css", cssRewriteUrlTransform)
                //.Include("~/Content/Styles/bootstrap-theme.css", cssRewriteUrlTransform)
                .Include("~/Content/Styles/font-awesome.css", cssRewriteUrlTransform)
                .Include("~/Content/Styles/toastr.css")
                //.Include("~/Content/Styles/main.css", cssRewriteUrlTransform)
                );
        }

        protected override void ConfigureScriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Bundles/Scripts")
                .Include(
                    "~/Scripts/es6-promise.auto.js",
                    "~/Scripts/jquery-2.1.4.js",
                    "~/Scripts/bootstrap.js",
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-ui-router.js",
                    "~/Scripts/spin.js",
                    "~/Scripts/toastr.js",
                    "~/Scripts/moment.js",
                    "~/Scripts/jquery.signalR-2.2.0.js",
                    "~/Scripts/ria.js"
                ));

            bundles.Add(new ScriptBundle("~/Bundles/App")
                .IncludeDirectory("~/App/Models", "*.js", true)
                .IncludeDirectory("~/App/Services", "*.js", true)
                //.IncludeDirectory("~/App/Filters", "*.js", true)
                .IncludeDirectory("~/App/Resolvers", "*.js", true)
                .IncludeDirectory("~/App/Directives", "*.js", true)
                //.IncludeDirectory("~/App/Popups", "*.js", true)
                .IncludeDirectory("~/App/Pages", "*.js", true)
                .Include("~/App/AppModule.js")
                );


        }
    }
}