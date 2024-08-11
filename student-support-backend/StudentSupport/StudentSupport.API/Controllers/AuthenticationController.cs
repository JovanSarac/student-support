using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace StudentSupport.API.Controllers;

[Route("api/users")]
public class AuthenticationController : BaseApiController
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IUserService _userService;

    public AuthenticationController(IAuthenticationService authenticationService, IUserService userService)
    {
        _authenticationService = authenticationService;
        _userService = userService;
    }

    [HttpPost("student")]
    public ActionResult<AuthenticationTokensDto> RegisterStudent([FromBody] AccountRegistrationDto account)
    {
        var result = _authenticationService.RegisterStudent(account);
        return CreateResponse(result);
    }

    [HttpPost("author")]
    public ActionResult<AuthenticationTokensDto> RegisterAuthor([FromBody] AccountRegistrationDto account)
    {
        var result = _authenticationService.RegisterAuthor(account);
        return CreateResponse(result);
    }

    [Authorize(Policy = "administratorPolicy")]
    [HttpPut("activate_user")]
    public ActionResult<UserDto> ActivateUser([FromBody] int userId)
    {
        var result = _userService.ActivateUser(userId);
        return CreateResponse(result);
    }

    [HttpPost("student/gmail")]
    public ActionResult<AuthenticationTokensDto> LoginStudentGmail([FromBody] AccountRegistrationGmailDto account)
    {
        var result = _authenticationService.LoginStudentGmail(account);
        return CreateResponse(result);
    }

    [HttpPost("login")]
    public ActionResult<AuthenticationTokensDto> Login([FromBody] CredentialsDto credentials)
    {
        var result = _authenticationService.Login(credentials);
        return CreateResponse(result);
    }
}