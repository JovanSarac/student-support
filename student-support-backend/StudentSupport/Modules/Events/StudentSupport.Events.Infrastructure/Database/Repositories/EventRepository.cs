using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;

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

        public Event Create(Event entity)
        {
            _dbSet.Add(entity);
            _dbContext.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _dbSet.Remove(entity);
            _dbContext.SaveChanges();
        }

        public Event Get(long id)
        {
            var eventTemp = _dbSet
                .Where(e => e.Id == id)
                .FirstOrDefault();
            return eventTemp ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<Event> GetPaged(int page, int pageSize)
        {
            var task = _dbSet.GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public Event Update(Event entity)
        {
            try
            {
                _dbContext.Update(entity);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }

        public List<Event> GetYoursEvents(long userId)
        {
            return _dbSet.Where(e => e.UserId == userId).ToList(); 
        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        public List<Event> GetAll()
        {
            List<Event> events = _dbSet.ToList();

            return events;
        }

        public List<Event> GetRandomFourEvents()
        {
            var currentDate = DateTime.UtcNow;
            return _dbSet
                .Where(e => e.DateEvent > currentDate && e.IsArchived == false)
                .Take(4) 
                .ToList();
        }

        public PagedResult<Event> GetIncomingPagedEvents(int page, int pageSize)
        {
            var currentDate = DateTime.UtcNow;

            var query = _dbSet
                .Where(e => e.DateEvent >= currentDate && !e.IsArchived);

            var totalCount = query.Count();

            if (pageSize == 0 && page == 0)
            {
                return new PagedResult<Event>(query.ToList(), totalCount);
            }

            var pagedEvents = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Event>(pagedEvents, totalCount);
        }


    }
}
