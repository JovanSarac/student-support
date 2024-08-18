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
    internal class MembershipDatabaseRepository : IMembershipRepository
    {
        private readonly ClubsContext _context;
        private readonly DbSet<Membership> _memberships;

        public MembershipDatabaseRepository(ClubsContext context)
        {
            _context = context;
            _memberships = _context.Set<Membership>();
        }

        public Membership Create(Membership entity)
        {
            _memberships.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _memberships.Remove(entity);
            _context.SaveChanges();
        }

        public Membership Get(long id)
        {
            var membership = _memberships
                 .Where(m => m.Id == id)
                 .FirstOrDefault();
            return membership ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<Membership> GetPaged(int page, int pageSize)
        {
            var task = _memberships.GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public Membership Update(Membership entity)
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
