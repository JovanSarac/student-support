using AutoMapper;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Core.UseCases
{
    public class ClubService : CrudService<ClubDto, Club>, IClubService
    {
        private readonly IClubRepository _clubRepository;
        private readonly IMapper _mapper;
        
        public ClubService(IClubRepository clubRepository, IMapper mapper) : base(clubRepository, mapper)
        {
            _mapper = mapper;
            _clubRepository = clubRepository;
        }


    }
}
