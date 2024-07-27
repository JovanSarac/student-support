using StudentSupport.BuildingBlocks.Core.UseCases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.Domain.RepositoryInterfaces
{
    public interface IEventRepository : ICrudRepository<Event>
    {
        List<Event>  GetYoursEvents(long userId);
        void SaveChanges();
        List<Event> GetAll();
    }
}
