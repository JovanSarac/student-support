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

        public EventRepository(EventsContext dbContext)
        {
            _dbContext = dbContext;
        }

    }
}
