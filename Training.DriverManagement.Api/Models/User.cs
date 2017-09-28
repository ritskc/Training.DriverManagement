using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI.WebControls;
using Training.DriverManagement.Api.Exceptions;

namespace Training.DriverManagement.Api.Models
{
    public class User
    {
        private readonly int _id;


        public int Id
        {
            get { return this._id; }
        }

        public string Email { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string PhoneNo { get; private set; }
        public bool IsDeleted { get; private set; }
        public int VersionNo { get; private set; }


        public User(int id, string email, string firstName, string lastName, string phoneNo = null)
        {
            this._id = id;
            this.SetParams(email, firstName, lastName, phoneNo);
        }


        public void Update(int versionNo, string email, string firstName, string lastName, string phoneNo = null)
        {
           lock (this)
            {
                if (this.VersionNo != versionNo)
                    throw new InvalidEntityVersionException();
                
                this.SetParams(email, firstName, lastName, phoneNo);
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


        private void SetParams(string email, string firstName, string lastName, string phoneNo = null)
        {
            this.Email = email;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.PhoneNo = phoneNo;
        }
    }
}