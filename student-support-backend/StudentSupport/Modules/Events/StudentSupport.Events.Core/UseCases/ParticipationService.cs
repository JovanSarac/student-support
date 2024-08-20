using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Internal;
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
        private readonly IInternalPersonService _internalPersonService;

        public ParticipationService(IParticipationRepository participationRepository, IEventService eventService, IEmailService emailService,  IInternalPersonService internalPersonService, IMapper mapper) : base(participationRepository, mapper) 
        {
            _participationRepository = participationRepository;
            _eventService = eventService;
            _emailService = emailService;
            _internalPersonService = internalPersonService;
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

                PersonDto personDto = _internalPersonService.GetByUserId((int)participationDto.StudentId).Value;

                await _emailService.SendEmailAsync(eventDto, personDto.Email);

                return Create(participationDto);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(e.Message);
            }
        }

        public Result<int> CountParticipationsByEventId(int eventId)
        {
            try
            {
                return _participationRepository.GetAllByEventId(eventId).Count(p => p.Type == ParticipationType.Active);

            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
            
        }

        public void CancelAllByEventId(int eventId)
        {
            try
            {
                foreach(Participation p in _participationRepository.GetAllByEventId(eventId)){
                    p.Cancel();
                    _participationRepository.SaveChanges();
                }
            }
            catch(ArgumentException e)
            {
                Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public async Task CancelAllByAuthor(int eventId)
        {
            try
            {
                List<string> emails = new List<string>();
                EventDto eventDto = _eventService.Get(eventId).Value;

                foreach (Participation p in _participationRepository.GetAllByEventId(eventId).Where(p => p.Type != ParticipationType.Cancelled))
                {
                    p.CancelByAuthor();
                    _participationRepository.SaveChanges();

                    PersonDto personDto = _internalPersonService.GetByUserId((int)p.StudentId).Value;
                    emails.Add(personDto.Email);
                }

                await _emailService.SendCancellationEmailsAsync(eventDto, emails);
            }
            catch (ArgumentException e)
            {
                Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public async Task SendMailAfterPublishingBack(int eventId)
        {
            try
            {
                List<string> emails = new List<string>();
                EventDto eventDto = _eventService.Get(eventId).Value;

                foreach (Participation p in _participationRepository.GetAllByEventId(eventId))
                {
                    if(p.Type == ParticipationType.CancelledByAuthor)
                    {
                        PersonDto personDto = _internalPersonService.GetByUserId((int)p.StudentId).Value;

                        emails.Add(personDto.Email);
                    }
                }

                await _emailService.SendPublishedEmailsAsync(eventDto, emails);
            }
            catch (ArgumentException e)
            {
                Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public async Task<Result> ResendMail(int eventId, int studentId)
        {
            try
            {
                EventDto eventDto = _eventService.Get(eventId).Value;

                PersonDto personDto = _internalPersonService.GetByUserId(studentId).Value;

                await _emailService.SendEmailAsync(eventDto, personDto.Email);

                return Result.Ok();

            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }
    }
}
