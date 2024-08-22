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
    public class ClubDatabaseRepository : IClubRepository
    {
        private readonly ClubsContext _context;
        private readonly DbSet<Club> _clubs;

        public ClubDatabaseRepository(ClubsContext context)
        {
            _context = context;
            _clubs = _context.Set<Club>();
        }

        public Club Create(Club entity)
        {
            _clubs.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _clubs.Remove(entity);
            _context.SaveChanges();
        }

        public Club Get(long id)
        {
            var club = _clubs
                .Where(c => c.Id == id)
                .Include(c => c.Memberships.OrderBy(m => m.EnrollmentDate))
                .FirstOrDefault();
            return club ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<Club> GetAllActiveClubs(int page, int pageSize)
        {
            var query = _clubs
                .Where(c => c.Status == ClubStatus.Active)
                .OrderByDescending(c => c.DatePublication);

            var totalCount = query.Count();

            if (pageSize == 0 && page == 0)
            {
                return new PagedResult<Club>(query.ToList(), totalCount);
            }

            var pagedClubs = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Club>(pagedClubs, totalCount);
        }

        public PagedResult<Club> GetClubsByAuthorIdPaged(int page, int pageSize, int authorId)
        {
            var query = _clubs
                .Where(c => c.OwnerId == authorId)
                .Include(c => c.Memberships.OrderBy(m => m.EnrollmentDate));

            var totalCount = query.Count();

            if (pageSize == 0 && page == 0)
            {
                return new PagedResult<Club>(query.ToList(), totalCount);
            }

            var pagedClubs = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Club>(pagedClubs, totalCount);
        }

        public PagedResult<Club> GetClubsByIdsPaged(int page, int pageSize, List<long> clubIds)
        {
            var query = _clubs
                .Where(c => clubIds.Contains(c.Id) && c.Status == ClubStatus.Active)
                .Include(c => c.Memberships.OrderBy(m => m.EnrollmentDate));

            var totalCount = query.Count();

            if (pageSize == 0 && page == 0)
            {
                return new PagedResult<Club>(query.ToList(), totalCount);
            }

            var pagedEvents = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Club>(pagedEvents, totalCount);
        }

        public PagedResult<Club> GetPaged(int page, int pageSize)
        {
            var task = _clubs.Include(c => c.Memberships.OrderBy(m => m.EnrollmentDate)).GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public Club Update(Club entity)
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
