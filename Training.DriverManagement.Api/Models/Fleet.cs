using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Training.DriverManagement.Api.Exceptions;

namespace Training.DriverManagement.Api.Models
{
    public class Fleet
    {
        private readonly int _id;
        private readonly List<Vehicle> _vehicles;

        public int Id { get { return this._id; } }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public bool IsDeleted { get; private set; }
        public int VersionNo { get; private set; }
        public IEnumerable<Vehicle> Vehicles { get { return this._vehicles; } }


        public Fleet(int id, string name, string description)
        {
            this._id = id;
           SetParams(name,description);
            this._vehicles = new List<Vehicle>();
        }


        public void Update(int versionNo,string name, string description)
        {
            lock (this)
            {
                if (this.VersionNo != versionNo)
                    throw new InvalidEntityVersionException();
                this.SetParams(name, description);
                this.VersionNo++;
            }
           
        }

        public void AssignVehicle(Vehicle vehicle)
        {
            if (this._vehicles.Any(t => t.Id == vehicle.Id)) return;

            this._vehicles.Add(vehicle);
        }

        public void UnassignVehicle(int vehicleId)
        {
            if (this._vehicles.All(t => t.Id != vehicleId)) return;

            this._vehicles.Remove(this._vehicles.First(t => t.Id == vehicleId));
        }


        public void Delete(int versionNo)
        {
            lock (this)
            {
                if (this.VersionNo != versionNo)
                    throw new InvalidEntityVersionException();

                this.IsDeleted = true;
                this.VersionNo++;
            }
        }

        public void ManageFleetVehilces(int versionNo, IEnumerable<Models.Vehicle> vehicles)
        {
            lock (this)
            {
                if (this.VersionNo != versionNo) 
                    throw new InvalidEntityVersionException();

                foreach (var vehicle in this._vehicles.ToList()) this.UnassignVehicle(vehicle.Id);
                foreach (var vehicle in vehicles) this.AssignVehicle(vehicle);

                this.VersionNo++;
            }
        }


        private void SetParams(string name, string description)
        {
            this.Name = name;
            this.Description = description;

        }
    }
}