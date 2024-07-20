using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace StudentSupport.Events.Infrastructure.Database.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly EventsContext _dbContext;
        private readonly DbSet<Event> _dbSet;

        public EventRepository(EventsContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<Event>();
        }

        public List<Event> GetYoursEvents(long userId)
        {
            return _dbSet.Where(e => e.UserId == userId).ToList(); 
        }
    }
}
