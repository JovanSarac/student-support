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

        public EventService(ICrudRepository<Event> repository, IEventRepository eventRepository, IMapper mapper) : base(repository, mapper)
        {
            _eventRepository = eventRepository; 
        }


        public Result<List<EventDto>> GetYoursEvents(long userId)
        {
            return MapToDto(_eventRepository.GetYoursEvents(userId));
        }
    }
}
