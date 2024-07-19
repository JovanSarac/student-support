using AutoMapper;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Core.UseCases
{
    public class ParticipationService : CrudService<ParticipationDto, Participation>, IParticipationService
    {
        private readonly IParticipationRepository _participationRepository;
        private readonly IMapper _mapper;

        public ParticipationService(IParticipationRepository participationRepository, IMapper mapper) : base(participationRepository, mapper) 
        {
            _participationRepository = participationRepository;
            _mapper = mapper;
        }


    }
}
