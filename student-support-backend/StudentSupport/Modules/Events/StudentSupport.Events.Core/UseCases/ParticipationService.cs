using AutoMapper;
using FluentResults;
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

        public Result<List<ParticipationDto>> GetAllByStudentId(int studentId)
        {
            List<ParticipationDto> participations = new List<ParticipationDto>();
            
            foreach(var participation in _participationRepository.GetAllByStudentId(studentId))
            {
                participations.Add(MapToDto(participation));
            }

            return participations;
        }

        public Result<ParticipationDto> Cancel(int id)
        {
            try
            {
                Participation participation = _participationRepository.Get(id);
                participation.Cancel();
                _participationRepository.SaveChanges();
                return MapToDto(participation);
            }
            catch(ArgumentException e)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(e.Message);
            }
        }
    }
}
