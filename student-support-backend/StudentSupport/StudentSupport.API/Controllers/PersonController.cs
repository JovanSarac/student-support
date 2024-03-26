using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;

namespace StudentSupport.API.Controllers
{
    //[Authorize(Policy = "authorPolicy")]
    [Route("api/author/person")]
    public class PersonController : BaseApiController
    {
        private readonly IPersonService _personService;
        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet("{userId:int}")]
        public ActionResult<PersonDto> GetByUserId(int userId)
        {
            var result = _personService.GetByUserId(userId);
            return CreateResponse(result);
        }
    }
}
