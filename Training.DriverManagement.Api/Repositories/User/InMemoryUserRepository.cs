using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Training.DriverManagement.Api.Models;

namespace Training.DriverManagement.Api.Repositories
{
    public class InMemoryUserRepository : IUserRepository
    {
        private static readonly Lazy<InMemoryUserRepository> __lazyInitializer =
            new Lazy<InMemoryUserRepository>(() => new InMemoryUserRepository());

        private readonly List<Models.User> _users;
        private readonly ReaderWriterLockSlim _readerWriterLockSlim = new ReaderWriterLockSlim();

        private InMemoryUserRepository()
        {
            this._users = new List<Models.User>();
        }

        public static InMemoryUserRepository Instance
        {
            get { return __lazyInitializer.Value; }
        }


        public Task<User> AddUserAsync(string email, string firstName, string lastName, string phoneNo = null)
        {

            this._readerWriterLockSlim.EnterWriteLock();
            try
            {
                var user = new User(this.CalculateId(), email, firstName, lastName, phoneNo);
                this._users.Add(user);

                return Task.FromResult(user);
            }
            finally
            {
                this._readerWriterLockSlim.ExitWriteLock();
            }
        }

        public Task<IEnumerable<User>> GetUsersAsync()
        {
            this._readerWriterLockSlim.EnterReadLock();
            try
            {
                return Task.FromResult((IEnumerable<User>)this._users.ToList());
            }
            finally
            {
                this._readerWriterLockSlim.ExitReadLock();
            }
        }


        private int CalculateId()
        {
            if (!this._users.Any()) return 1;
            return this._users.OrderByDescending(t => t.Id).First().Id + 1;
        }
    }
}