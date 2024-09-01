using Microsoft.AspNetCore.Mvc;
using StudentSupport.Clubs.API.Dtos;
using StudentSupport.Events.API.Public;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers
{
    [Route("api/anonymus/contactus")]
    public class ContactUsController : BaseApiController
    {
        private readonly IContactMessageService _contactMessageService;
        public ContactUsController(IContactMessageService contactMessageService)
        {
            _contactMessageService = contactMessageService;
        }

        [HttpPost]
        public ActionResult<ContactMessageDto> Create([FromBody] ContactMessageDto contactMessageDto)
        {
            var result = _contactMessageService.Create(contactMessageDto);
            return CreateResponse(result);
        }
    }
}
