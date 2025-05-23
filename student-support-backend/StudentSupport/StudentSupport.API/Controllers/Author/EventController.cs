﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.UseCases;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/events")]
    public class EventController  : BaseApiController
    {
        private readonly IEventService _eventService;
        private readonly IParticipationService _participationService;
        public EventController(IEventService eventService, IParticipationService participationService)
        {
            _eventService = eventService;
            _participationService = participationService;
        }

        [HttpGet]
        public ActionResult<PagedResult<EventDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _eventService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("get_all_incoming_events")]
        public ActionResult<PagedResult<EventDto>> GetAllIncomingEvents([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _eventService.GetIncomingEventsPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<EventDto> Get(int id)
        {
            var result = _eventService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("is_author_of_event/{eventId:int}/{authorId:int}")]
        public ActionResult<bool> IsAuthorOfEvent(int eventId, int authorId)
        {
            var result = _eventService.IsAuthorOfEvent(authorId, eventId);
            return CreateResponse(result);
        }

        [HttpPut("archive")]
        public ActionResult<EventDto> ArchiveEvent([FromBody] int id)
        {
            var result = _eventService.Archive(id, User);

            if(result.IsSuccess)
            {
                _participationService.CancelAllByAuthor(id);
            }

            return CreateResponse(result);
        }

        [HttpPut("publish")]
        public ActionResult<EventDto> PublishEvent([FromBody] int id)
        {
            var result = _eventService.Publish(id, User);

            if (result.IsSuccess)
            {
                _participationService.SendMailAfterPublishingBack(id);
            }

            return CreateResponse(result);
        }

        [HttpGet("get_yours_events/{id:long}")]
        public ActionResult<List<EventDto>> GetYoursEvents(long id)
        {
            var loggedInUserId = User.FindFirst("id")?.Value;

            if (loggedInUserId != id.ToString())
            {
                return Forbid();
            }
            var result = _eventService.GetYoursEvents(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<EventDto> Create([FromBody] EventDto eventDto)
        {
            var result = _eventService.Create(eventDto);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<List<EventDto>> Update([FromBody] EventDto eventDto)
        {
            var loggedInUserId = User.FindFirst("id")?.Value;

            if (loggedInUserId != eventDto.UserId.ToString())
            {
                return Forbid();
            }
            var result = _eventService.Update(eventDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _eventService.Delete(id);
            return CreateResponse(result);
        }

        [HttpPost("search_events/{name?}")]
        public ActionResult<List<EventDto>> GetEventsBySearchName([FromBody] List<EventDto> eventDtos, string? name)
        {
            var result = _eventService.GetEventsBySearchName(eventDtos, name);
            return CreateResponse(result);
        }

        [HttpPost("filter_event_types")]
        public ActionResult<List<EventDto>> GetEventsByFiltersTypes([FromBody] FilterEventTypesRequestDto request)
        {
            var result = _eventService.GetEventsByFiltersTypes(request.EventDtos, request.TypeOfEvents);
            return CreateResponse(result);
        }

        [HttpPost("filter_event_dates")]
        public ActionResult<List<EventDto>> GetEventsByFiltersDates([FromBody] FilterEventDatesRequestDto request)
        {
            var result = _eventService.GetEventsByFiltersDates(request.EventDtos, request.DateEvents, request.startDate, request.endDate);
            return CreateResponse(result);
        }

        [HttpPost("filter_event_price")]
        public ActionResult<List<EventDto>> GetEventsByFiltersPrice([FromBody] FilterEventPriceRequestDto request)
        {
            var result = _eventService.GetEventsByFiltersPrice(request.EventDtos, request.Price);
            return CreateResponse(result);
        }
    }
}
