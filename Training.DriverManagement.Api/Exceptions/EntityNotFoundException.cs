using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Training.DriverManagement.Api.Exceptions
{
    public class EntityNotFoundException<T>: ApplicationException where T: class
    {
        private readonly int _id;


        public int EntityId { get { return this._id; } }


        public EntityNotFoundException(int id): base(string.Format("{0} with Id '{1}' was not found.", typeof(T).Name, id))
        {
            this._id = id;
        }
    }
}