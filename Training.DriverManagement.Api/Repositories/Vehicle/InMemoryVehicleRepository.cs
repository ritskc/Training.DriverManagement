using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Training.DriverManagement.Api.Models;

namespace Training.DriverManagement.Api.Repositories
{
    public class InMemoryVehicleRepository : IVehicleRepository
    {
        private static readonly Lazy<InMemoryVehicleRepository> __lazyRepository =
            new Lazy<InMemoryVehicleRepository>(() => new InMemoryVehicleRepository());

        private readonly List<Vehicle> _vehicles;
        private readonly ReaderWriterLockSlim _readerWriterLockSlim = new ReaderWriterLockSlim();


        private InMemoryVehicleRepository()
        {
            this._vehicles = new List<Vehicle>();
        }

        public static InMemoryVehicleRepository Instance => __lazyRepository.Value;


        public Task<Vehicle> AddVehicleAsync(string description, string type, string make, string model)
        {
            this._readerWriterLockSlim.EnterWriteLock();
            
            try
            {
                var vehicle = new Vehicle(CalculateId(), description, type, make, model);
                this._vehicles.Add(vehicle);

                return Task.FromResult(vehicle);
            }
            finally
            {
                this._readerWriterLockSlim.ExitWriteLock();
            }
        }

        public Task<IEnumerable<Vehicle>> GetVehiclesAsync()
        {
            this._readerWriterLockSlim.EnterReadLock();
           
            try
            {
                return Task.FromResult((IEnumerable<Vehicle>)this._vehicles.ToList());
            }
            finally
            {
                this._readerWriterLockSlim.ExitReadLock();
            }
            
        }


        private int CalculateId()
        {
            if (!this._vehicles.Any()) return 1;
            return this._vehicles.OrderByDescending(t => t.Id).First().Id + 1;
        }
    }
}