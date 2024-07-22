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
    public class ParticipationDatabaseRepository : IParticipationRepository
    {
        private readonly EventsContext _eventsContext;
        private readonly DbSet<Participation> _participations;

        public ParticipationDatabaseRepository(EventsContext eventsContext)
        {
            _eventsContext = eventsContext;
            _participations = _eventsContext.Set<Participation>();
        }

        public Participation Create(Participation entity)
        {
            _participations.Add(entity);
            _eventsContext.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _participations.Remove(entity);
            _eventsContext.SaveChanges();
        }

        public Participation Get(long id)
        {
            var participation = _participations
                .Where(p => p.Id == id)
                .FirstOrDefault();
            return participation ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<Participation> GetPaged(int page, int pageSize)
        {
            var task = _participations.GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public Participation Update(Participation entity)
        {
            try
            {
                _eventsContext.Update(entity);
                _eventsContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }

        public void SaveChanges()
        {
            _eventsContext.SaveChanges();
        }

        public List<Participation> GetAllByStudentId(int studentId)
        {
            List<Participation> participationList = _participations
                    .Where(p => p.StudentId == studentId)
                    .ToList();

            return participationList;
        }
    }
}
