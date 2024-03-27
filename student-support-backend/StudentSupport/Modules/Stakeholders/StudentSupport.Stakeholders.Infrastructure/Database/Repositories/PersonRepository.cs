using StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace StudentSupport.Stakeholders.Infrastructure.Database.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly StakeholdersContext _dbContext;

        public PersonRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
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
    }
}
