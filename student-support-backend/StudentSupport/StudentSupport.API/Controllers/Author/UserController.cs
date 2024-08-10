using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using StudentSupport.Stakeholders.Core.UseCases;

namespace StudentSupport.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/users")]
    public class UserController : BaseApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId:int}")]
        public ActionResult<UserDto> GetByUserId(int userId)
        {
            var result = _userService.GetByUserId(userId);
            return CreateResponse(result);
        }
    }
}
