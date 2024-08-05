using Microsoft.AspNetCore.Authorization;
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
            var result = _eventService.Archive(id);

            if(result.IsSuccess)
            {
                _participationService.CancelAllByAuthor(id);
            }

            return CreateResponse(result);
        }

        [HttpPut("publish")]
        public ActionResult<EventDto> PublishEvent([FromBody] int id)
        {
            var result = _eventService.Publish(id);

            if (result.IsSuccess)
            {
                _participationService.SendMailAfterPublishingBack(id);
            }

            return CreateResponse(result);
        }

        [HttpGet("get_yours_events/{id:long}")]
        public ActionResult<List<EventDto>> GetYoursEvents(long id)
        {
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
            var result = _eventService.Update(eventDto);
            return CreateResponse(result);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var result = _eventService.Delete(id);
            return CreateResponse(result);
        }
    }
}
