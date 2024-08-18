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
                .FirstOrDefault();
            return club ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<Club> GetPaged(int page, int pageSize)
        {
            var task = _clubs.GetPagedById(page, pageSize);
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
