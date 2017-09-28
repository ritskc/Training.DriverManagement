using System;
using System.IO;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Framework.Logging;

namespace Training.DriverManagement
{
    public class IocInstaller: IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(

                Component.For<ILog>()
                    .ImplementedBy<TextLog>().UsingFactoryMethod(() =>
                    {
                        var path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                                @"BSM\Training.DriverManagement\Logs");
                        return new TextLog(path, TimeSpan.FromDays(14), true);
                    })
                    .LifestyleSingleton()

            );
        }
    }
}