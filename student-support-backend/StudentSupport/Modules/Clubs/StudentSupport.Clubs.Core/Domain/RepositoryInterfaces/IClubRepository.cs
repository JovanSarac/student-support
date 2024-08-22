using StudentSupport.BuildingBlocks.Core.UseCases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.Domain.RepositoryInterfaces
{
    public interface IClubRepository : ICrudRepository<Club>
    {
        PagedResult<Club> GetAllActiveClubs(int page, int pageSize);
        PagedResult<Club> GetClubsByIdsPaged(int page, int pageSize, List<long> clubIds);
        PagedResult<Club> GetClubsByAuthorIdPaged(int page, int pageSize, int authorId);
        void SaveChanges();
    }
}
