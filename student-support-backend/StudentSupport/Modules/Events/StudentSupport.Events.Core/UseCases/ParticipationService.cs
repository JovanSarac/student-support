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
using System.Web;

namespace StudentSupport.Events.Core.UseCases
{
    public class ParticipationService : CrudService<ParticipationDto, Participation>, IParticipationService
    {
        private readonly IParticipationRepository _participationRepository;
        private readonly IEventService _eventService;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public ParticipationService(IParticipationRepository participationRepository, IEventService eventService, IEmailService emailService, IMapper mapper) : base(participationRepository, mapper) 
        {
            _participationRepository = participationRepository;
            _eventService = eventService;
            _emailService = emailService;
            _mapper = mapper;
        }

        public Result<List<ParticipationDto>> GetAllByStudentId(int studentId)
        {
            try
            {
                List<ParticipationDto> participations = new List<ParticipationDto>();
            
                foreach(var participation in _participationRepository.GetAllByStudentId(studentId))
                {
                    participations.Add(MapToDto(participation));
                }

                return participations;
            }
            catch(ArgumentException e)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(e.Message);
            }
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

        public async Task<Result<ParticipationDto>> CreateWithEmail(ParticipationDto participationDto)
        {
            try
            {
                EventDto eventDto =  _eventService.Get((int)participationDto.EventId).Value;

                await _emailService.SendEmailAsync(participationDto, eventDto);

                return Create(participationDto);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(e.Message);
            }
        }
    }
}
