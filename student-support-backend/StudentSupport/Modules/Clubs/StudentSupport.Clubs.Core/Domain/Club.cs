using StudentSupport.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.Domain
{
    public class Club : Entity
    {
        public string Name { get; init; }
        public string Description { get; init; }

        public Club(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
