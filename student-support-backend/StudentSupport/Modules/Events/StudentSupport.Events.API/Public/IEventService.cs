﻿using FluentResults;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.API.Public
{
    public interface IEventService
    {
        Result<PagedResult<EventDto>> GetPaged(int page, int pageSize);
        Result<PagedResult<EventDto>> GetIncomingEventsPaged(int page, int pageSize);
        Result<EventDto> Create(EventDto eventDto);
        Result<EventDto> Update(EventDto eventDto);
        Result Delete(int id);
        Result<EventDto> Get(int id);
        Result<bool> IsAuthorOfEvent(int authorId, int eventid);
        Result<EventDto> Archive(int id, ClaimsPrincipal user);
        Result<EventDto> Publish(int id, ClaimsPrincipal user);
        Result<List<EventDto>> GetYoursEvents(long userId);
        Result<List<EventDto>> GetYoursParticipateEvents(int userId);
        Result<List<EventDto>> GetRandomFourEvents();
        Result<List<EventDto>> GetEventsBySearchName(List<EventDto> eventDtos, string? searchName);
        Result<List<EventDto>> GetEventsByFiltersTypes(List<EventDto> eventDtos, List<string> typeOfEvents);
        Result<List<EventDto>> GetEventsByFiltersDates(List<EventDto> eventDtos, string dateEvents, DateTime? startDate, DateTime? endDate);
        Result<List<EventDto>> GetEventsByFiltersPrice(List<EventDto> eventDtos, string price);

    }
}
