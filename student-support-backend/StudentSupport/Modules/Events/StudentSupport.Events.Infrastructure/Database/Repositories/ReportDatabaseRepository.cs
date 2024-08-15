using Microsoft.EntityFrameworkCore;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;
using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Infrastructure.Database.Repositories
{
    public class ReportDatabaseRepository : IReportRepository
    {
        private readonly EventsContext _eventsContext;
        private readonly DbSet<Report> _reports;

        public ReportDatabaseRepository(EventsContext eventsContext)
        {
            _eventsContext = eventsContext;
            _reports = _eventsContext.Set<Report>();
        }

        public Report Create(Report entity)
        {
            _reports.Add(entity);
            _eventsContext.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _reports.Remove(entity);
            _eventsContext.SaveChanges();
        }

        public Report Get(long id)
        {
            var report = _reports
                .Where(p => p.Id == id)
                .FirstOrDefault();
            return report ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public void SaveChanges()
        {
            _eventsContext.SaveChanges();
        }

        public PagedResult<Report> GetPaged(int page, int pageSize)
        {
            var task = _reports.GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public Report Update(Report entity)
        {
            try
            {
                _eventsContext.Update(entity);
                _eventsContext.SaveChanges();
            }
            catch(DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }
    }
}
