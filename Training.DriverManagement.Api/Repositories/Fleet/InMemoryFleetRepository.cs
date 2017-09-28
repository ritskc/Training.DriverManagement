using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Training.DriverManagement.Api.Models;

namespace Training.DriverManagement.Api.Repositories
{
    public class InMemoryFleetRepository : IFleetRepository
    {
        private static readonly Lazy<InMemoryFleetRepository> __lazyInitializer =
            new Lazy<InMemoryFleetRepository>(() => new InMemoryFleetRepository());

        private readonly List<Models.Fleet> _fleets;

        private readonly ReaderWriterLockSlim _readerWriterLockSlim = new ReaderWriterLockSlim();


        private InMemoryFleetRepository()
        {
            this._fleets = new List<Models.Fleet>();
        }

        public static InMemoryFleetRepository Instance
        {
            get { return __lazyInitializer.Value; }
        }


        public Task<Models.Fleet> AddFleetAsync(string name, string description)
        {
            this._readerWriterLockSlim.EnterWriteLock();

            try
            {
                var fleet = new Models.Fleet(CalculateId(), name, description);
                this._fleets.Add(fleet);

                return Task.FromResult(fleet);
            }
            finally
            {
                this._readerWriterLockSlim.ExitWriteLock();
            }

        }

        public Task<IEnumerable<Models.Fleet>> GetFleetsAsync()
        {
            this._readerWriterLockSlim.EnterReadLock();

            try
            {
                return Task.FromResult((IEnumerable<Models.Fleet>)this._fleets.ToList());
            }
            finally
            {
                this._readerWriterLockSlim.ExitReadLock();
            }
           
        }

        
        private int CalculateId()
        {
            if (!this._fleets.Any()) return 1;
            return this._fleets.OrderByDescending(t => t.Id).First().Id + 1;
        }
    }
}