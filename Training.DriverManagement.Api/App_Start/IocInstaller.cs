using System;
using System.IO;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Framework.Logging;
using Training.DriverManagement.Api.Repositories;

namespace Training.DriverManagement.Api
{
    public class IocInstaller: IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(

                Component.For<IDriverRepository>()
                    .ImplementedBy<InMemoryDriverRepository>().UsingFactoryMethod(()=>InMemoryDriverRepository.Instance)
                    .LifestyleSingleton(),  
                
                Component.For<IUserRepository>()
                    .ImplementedBy<InMemoryUserRepository>().UsingFactoryMethod(() => InMemoryUserRepository.Instance)
                    .LifestyleSingleton(),

                Component.For<IVehicleRepository>()
                    .ImplementedBy<InMemoryVehicleRepository>().UsingFactoryMethod(()=>InMemoryVehicleRepository.Instance)
                    .LifestyleSingleton(),

                Component.For<IFleetRepository>()
                    .ImplementedBy<InMemoryFleetRepository>().UsingFactoryMethod(()=>InMemoryFleetRepository.Instance)
                    .LifestyleSingleton(),

                Component.For<ILog>()
                    .ImplementedBy<TextLog>().UsingFactoryMethod(() =>
                    {
                        var path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                                @"BSM\Training.DriverManagement.Api\Logs");
                        return new TextLog(path, TimeSpan.FromDays(14), true);
                    })
                    .LifestyleSingleton()

                );
            
        }
    }
}