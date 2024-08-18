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
    public class MembershipService : CrudService<MembershipDto, Membership>, IMembershipService
    {
        private readonly IMembershipRepository _membershipRepository;
        private readonly IMapper _mapper;

        public MembershipService(IMembershipRepository membershipRepository, IMapper mapper) : base(membershipRepository, mapper)
        {
            _mapper = mapper;
            _membershipRepository = membershipRepository;
        }
    }
}
