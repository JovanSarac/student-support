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
    }
}
