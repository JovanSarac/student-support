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
    }
}
