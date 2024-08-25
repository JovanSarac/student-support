using Microsoft.EntityFrameworkCore;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Infrastructure.Database.Repositories
{
    public class ClubReportDatabaseRepository : IClubReportRepository
    {
        private readonly ClubsContext _context;
        private readonly DbSet<ClubReport> _reports;

        public ClubReportDatabaseRepository(ClubsContext clubsContext)
        {
            _context = clubsContext;
            _reports = _context.Set<ClubReport>();
        }

        public ClubReport Create(ClubReport entity)
        {
            _reports.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _reports.Remove(entity);
            _context.SaveChanges();
        }

        public ClubReport Get(long id)
        {
            var report = _reports
                .Where(p => p.Id == id)
                .FirstOrDefault();
            return report ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<ClubReport> GetPaged(int page, int pageSize)
        {
            var task = _reports.GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public ClubReport Update(ClubReport entity)
        {
            try
            {
                _context.Update(entity);
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }
    }
}
