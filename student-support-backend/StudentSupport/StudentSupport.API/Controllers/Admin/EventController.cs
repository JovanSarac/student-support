using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Events.API.Dtos;
using StudentSupport.Events.API.Public;

namespace StudentSupport.API.Controllers.Admin
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/events")]
    public class EventController : BaseApiController
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

        [HttpGet("{id:int}")]
        public ActionResult<EventDto> Get(int id)
        {
            var result = _eventService.Get(id);
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
