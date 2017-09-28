using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Training.DriverManagement.Api.Repositories
{
    public class InMemoryDriverRepository : IDriverRepository
    {
        private static readonly Lazy<InMemoryDriverRepository> __lazyInitializer =
            new Lazy<InMemoryDriverRepository>(() => new InMemoryDriverRepository());

        private readonly List<Models.Driver> _drivers;
        private readonly ReaderWriterLockSlim _readerWriterLockSlim = new ReaderWriterLockSlim();

        private InMemoryDriverRepository()
        {
            this._drivers = new List<Models.Driver>();
        }

        public static InMemoryDriverRepository Instance
        {
            get { return __lazyInitializer.Value; }
        }


        public Task<IEnumerable<Models.Driver>> GetDriversAsync()
        {
            this._readerWriterLockSlim.EnterReadLock();

            try
            {
                return Task.FromResult((IEnumerable<Models.Driver>)this._drivers.ToList());
            }
            finally
            {
                this._readerWriterLockSlim.ExitReadLock();
            }
        }

        public Task<Models.Driver> AddDriverAsync(string firstName, string lastName, string phone, string email = null)
        {
            this._readerWriterLockSlim.EnterWriteLock();

            try
            {
                var driver = new Models.Driver(this.CalculateId(), firstName, lastName, phone, email);
                this._drivers.Add(driver);
                return Task.FromResult(driver);
            }
            finally
            {
                this._readerWriterLockSlim.ExitWriteLock();
            }
            
        }


        private int CalculateId()
        {
            if (!this._drivers.Any()) return 1;

            return this._drivers.OrderByDescending(t => t.Id).Select(t => t.Id).First() + 1;
        }
    }
}