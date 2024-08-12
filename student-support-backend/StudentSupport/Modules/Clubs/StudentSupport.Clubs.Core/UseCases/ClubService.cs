using AutoMapper;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.UseCases
{
    public class ClubService : CrudService<ClubDto, Club>, IClubService
    {
        public ClubService(ICrudRepository<Club> repository, IMapper mapper) : base(repository, mapper)
        {
         
        }
    }
}
