using StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;

namespace StudentSupport.Stakeholders.Infrastructure.Database.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly StakeholdersContext _dbContext;
        private readonly DbSet<Person> _people; 

        public PersonRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
            _people = _dbContext.Set<Person>();
        }

        public Person GetByUserId(long userId)
        {
            var person = _dbContext.People.FirstOrDefault(x => x.UserId == userId);
            if (person == null) throw new KeyNotFoundException("Not found.");
            return person;
        }

        public Person Update(Person person)
        {
            try
            {
                _dbContext.Update(person);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }

            return person;
        }

        public Person? GetByEmailWithGmail(string email)
        {
            var query = from person in _dbContext.People
                        join user in _dbContext.Users
                        on person.UserId equals user.Id
                        where person.Email == email && user.RegisterWithEmail
                        select person;

            var entity = query.FirstOrDefault();

            return entity;
        }

        public PagedResult<Person> GetPeopleByIdsPaged(int page, int pageSize, List<long> memberIds)
        {
            var task = _people
                .Where(p => memberIds.Contains(p.Id))
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }
    }
}
