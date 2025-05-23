﻿using AutoMapper;
using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using StudentSupport.Stakeholders.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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


        public Result<EventDto> Archive(int id, ClaimsPrincipal user)
        {
            try
            {
                Event eventTemp = _eventRepository.Get(id);

                var loggedInUserId = user.FindFirst("id")?.Value;

                if (eventTemp.UserId.ToString() != loggedInUserId)
                {
                    return Result.Fail(FailureCode.Forbidden).WithError("You do not have permission to archive this event.");
                }
                eventTemp.Archive();
                _eventRepository.SaveChanges();

                return MapToDto(eventTemp);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<EventDto> Publish(int id, ClaimsPrincipal user)
        {
            try
            {
                Event eventTemp = _eventRepository.Get(id);
                var loggedInUserId = user.FindFirst("id")?.Value;

                if (eventTemp.UserId.ToString() != loggedInUserId)
                {
                    return Result.Fail(FailureCode.Forbidden).WithError("You do not have permission to publish this event.");
                }
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
                .OrderByDescending(p => p.EnrollmentDate)
                .Select(p => _eventRepository.Get(p.EventId))
                .Where(e => e != null)
                .ToList();

            return MapToDto(events);
        }

        public Result<List<EventDto>> GetRandomFourEvents()
        {
            return MapToDto(_eventRepository.GetRandomFourEvents());
        }


        public Result<PagedResult<EventDto>> GetIncomingEventsPaged(int page, int pageSize)
        {
            var result = _eventRepository.GetIncomingPagedEvents(page, pageSize);
            return MapToDto(result);
        }

        public Result<List<EventDto>> GetEventsBySearchName(List<EventDto> eventDtos, string? searchName)
        {
            if (searchName == null) 
                return eventDtos;
            var result = eventDtos.FindAll(e => e.Name.ToUpper().Contains(searchName.ToUpper()));
            return result;
        }

        public Result<List<EventDto>> GetEventsByFiltersTypes(List<EventDto> eventDtos, List<string> typeOfEvents)
        {
            if (typeOfEvents.Count == 0)
                return eventDtos;

            var result = eventDtos.FindAll(e => typeOfEvents.Contains(e.EventType));
            return result;
        }

        public Result<List<EventDto>> GetEventsByFiltersDates(List<EventDto> eventDtos, string dateEvents, DateTime? startDate, DateTime? endDate)
        {
            if (dateEvents == "")
                return eventDtos;

            var result = new List<EventDto>();
            if(dateEvents == "today")
            {
                result = eventDtos.FindAll(e => e.DateEvent.Date == DateTime.Today.Date);
            }
            else if(dateEvents == "tommorow")
            {
                result = eventDtos.FindAll(e => e.DateEvent.Date == DateTime.Today.AddDays(1).Date);
            }
            else if(dateEvents == "thisweek")
            {
                DateTime today = DateTime.Today;
                DateTime startOfWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);  
                DateTime endOfWeek = startOfWeek.AddDays(6);

                result = eventDtos.FindAll(e => e.DateEvent.Date >= startOfWeek.Date && e.DateEvent.Date <= endOfWeek.Date);
            }
            else if (dateEvents == "thismonth")
            {
                DateTime today = DateTime.Today;
                DateTime startOfMonth = new DateTime(today.Year, today.Month, 1);
                DateTime endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

                result = eventDtos.FindAll(e => e.DateEvent.Date >= startOfMonth.Date && e.DateEvent.Date <= endOfMonth.Date);
            }
            else if (dateEvents == "pickdate")
            {
                result = eventDtos.FindAll(e => e.DateEvent.Date >= startDate && e.DateEvent.Date <= endDate);
            }

             return result;
        }

        public Result<List<EventDto>> GetEventsByFiltersPrice(List<EventDto> eventDtos, string price)
        {
            if (price == "")
                return eventDtos;

            var result = new List<EventDto>();
            if(price == "free")
            {
                result = eventDtos.FindAll(e => e.Price == 0);
            }
            else if(price == "paid")
            {
                result = eventDtos.FindAll(e => e.Price > 0);
            }
            return result;
        }
    }
}
