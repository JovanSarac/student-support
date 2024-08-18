using StudentSupport.BuildingBlocks.Core.UseCases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.Domain.RepositoryInterfaces
{
    public interface IMembershipRepository : ICrudRepository<Membership>
    {
        List<long> GetClubIdsByStudentId(long studentId);
        void SaveChanges();
    }
}
