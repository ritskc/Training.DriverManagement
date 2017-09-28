using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Training.DriverManagement.Api.Exceptions;

namespace Training.DriverManagement.Api.Models
{
    public class Vehicle
    {
        private readonly int _id;

        public int Id { get { return this._id; } }
        public string Description { get; private set; }
        public string Type { get; private set; }
        public string Make { get; private set; }
        public string Model { get; private set; }
        public double? Lat { get; private set; }
        public double? Lon { get; private set; }
        public int VersionNo { get; private set; }
        public bool IsDeleted { get; set; }


        public Vehicle(int id, string description, string type, string make, string model)
        {
            this._id = id;

            this.SetParams(description, type, make, model);
        }


        public void Update(int versionNo,string description, string type, string make, string model)
        {
            lock (this)
            {
                if(this.VersionNo!=versionNo)
                    throw new InvalidEntityVersionException();
                this.SetParams(description, type, make, model);
                this.VersionNo++;
            }
           
        }

        public void UpdatePosition(int versionNo,double lat, double lon)
        {
            lock (this)
            {
                if(this.VersionNo!=versionNo)
                    throw new InvalidEntityVersionException();
                this.Lat = lat;
                this.Lon = lon;
                this.VersionNo++;
            }
            
        }

        public void Delete(int versionNo)
        {
            lock (this)
            {
                if(this.VersionNo!=versionNo)
                    throw new InvalidEntityVersionException();
                this.IsDeleted = true;
                this.VersionNo++;
            }
            
        }

        private void SetParams(string description, string type, string make, string model)
        {
            this.Description = description;
            this.Type = type;
            this.Make = make;
            this.Model = model;
        }
    }
}