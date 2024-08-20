using StudentSupport.BuildingBlocks.Core.UseCases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces
{
    public interface IPersonRepository
    {
        Person GetByUserId(long userId);
        Person Update(Person person);
        Person? GetByEmailWithGmail(string email);
        PagedResult<Person> GetPeopleByIdsPaged(int page, int pageSize, List<long> memberIds);
    }
}
