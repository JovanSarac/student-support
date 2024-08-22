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
    internal class AnnouncementDatabaseRepository : IAnnouncementRepository
    {
        private readonly ClubsContext _context;
        private readonly DbSet<Announcement> _announcements;

        public AnnouncementDatabaseRepository(ClubsContext clubsContext)
        {
            _context = clubsContext;
            _announcements = _context.Set<Announcement>();
        }

        public Announcement Create(Announcement entity)
        {
            _announcements.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _announcements.Remove(entity);
            _context.SaveChanges();
        }

        public Announcement Get(long id)
        {
            var announcement = _announcements
                .Where(c => c.Id == id)
                .FirstOrDefault();
            return announcement ?? throw new KeyNotFoundException("Announcement not found: " + id);
        }

        public PagedResult<Announcement> GetAllByClubIdPaged(int page, int pageSize, long clubId)
        {
            var query = _announcements
                .Where(a => a.ClubId == clubId)
                .OrderByDescending(a => a.PublicationDate);

            var totalCount = query.Count();

            if (pageSize == 0 && page == 0)
            {
                return new PagedResult<Announcement>(query.ToList(), totalCount);
            }

            var pagedClubs = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Announcement>(pagedClubs, totalCount);
        }

        public PagedResult<Announcement> GetPaged(int page, int pageSize)
        {
            var task = _announcements
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public Announcement Update(Announcement entity)
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
