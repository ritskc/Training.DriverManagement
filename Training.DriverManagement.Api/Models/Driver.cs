using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Training.DriverManagement.Api.Exceptions;

namespace Training.DriverManagement.Api.Models
{
    public class Driver
    {
        private readonly int _id;

        public int Id { get { return this._id; } }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Phone { get; private set; }
        public string Email { get; private set; }
        public bool IsDeleted { get; private set; }
        public int VersionNo { get; private set; }


        public Driver(int id, string firstName, string lastName, string phone, string email = null)
        {
            this._id = id;
            this.SetParams(firstName, lastName, phone, email);
        }


        public void Update(int versionNo, string firstName, string lastName, string phone, string email = null)
        {
            lock (this)
            {
                if (this.VersionNo != versionNo)
                    throw new InvalidEntityVersionException();

                this.SetParams(firstName, lastName, phone, email);
                this.VersionNo++;
            }
        }


        public void Delete(int versionNo)
        {
            lock (this)
            {
                if(this.VersionNo != versionNo)
                    throw new InvalidEntityVersionException();

                this.IsDeleted = true;
                this.VersionNo++;
            }
        }


        private void SetParams(string firstName, string lastName, string phone, string email = null)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Phone = phone;
            this.Email = email;
        }
    }
}