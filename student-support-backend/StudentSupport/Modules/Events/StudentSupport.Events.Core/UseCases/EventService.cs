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
    public class EventService : CrudService<EventDto,Event>, IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IParticipationRepository _participationRepository;

        public EventService(ICrudRepository<Event> repository, IEventRepository eventRepository, IParticipationRepository participationRepository, IMapper mapper) : base(repository, mapper)
        {
            _eventRepository = eventRepository;
            _participationRepository = participationRepository;
        }


        public Result<List<EventDto>> GetYoursEvents(long userId)
        {
            return MapToDto(_eventRepository.GetYoursEvents(userId));
        }

        public Result<bool> IsAuthorOfEvent(int authorId, int eventId)
        {
            try
            {
                var eventCount =  _eventRepository.GetAll().Count(e => e.Id == eventId && e.UserId == authorId);

                if(eventCount == 0)
                {
                    return false;
                }

                return true;
            }
            catch (ArgumentException ex)
            {
                return Result.Fail(FailureCode.NotFound).WithError(ex.Message);
            }
        }


        public Result<EventDto> Archive(int id)
        {
            try
            {
                Event eventTemp = _eventRepository.Get(id);
                eventTemp.Archive();
                _eventRepository.SaveChanges();

                return MapToDto(eventTemp);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<EventDto> Publish(int id)
        {
            try
            {
                Event eventTemp = _eventRepository.Get(id);
                eventTemp.Publish();
                _eventRepository.SaveChanges();

                return MapToDto(eventTemp);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<EventDto>> GetYoursParticipateEvents(int userId)
        {
            var participations = _participationRepository.GetAllByStudentId(userId);

            if (participations.Count == 0)
            {
                return new List<EventDto>();
            }

            var events = participations
                .Where(p => p.Type == ParticipationType.Active)
                .Select(p => _eventRepository.Get(p.EventId))
                .Where(e => e != null)
                .ToList();

            return MapToDto(events);
        }

    }
}
