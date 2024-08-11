using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using StudentSupport.Events.API.Public;

namespace StudentSupport.API.Controllers;

[Route("api/users")]
public class AuthenticationController : BaseApiController
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IUserService _userService;
    private readonly IEmailService _emailService;

    public AuthenticationController(IAuthenticationService authenticationService, IUserService userService, IEmailService emailService)
    {
        _authenticationService = authenticationService;
        _userService = userService;
        _emailService = emailService;
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
        
        if (result.IsSuccess)
        {
            _emailService.SendActivationEmailAsync(result.Value.Username, (int)result.Value.Id, result.Value.Role);
        }

        return CreateResponse(result);
    }

    [Authorize(Policy = "administratorPolicy")]
    [HttpPut("deactivate_user")]
    public ActionResult<UserDto> DeactivateUser([FromBody] int userId)
    {
        var result = _userService.DeactivateUser(userId);

        if (result.IsSuccess)
        {
            _emailService.SendDeactivationEmailAsync(result.Value.Username, (int)result.Value.Id, result.Value.Role);
        }

        return CreateResponse(result);
    }

    [Authorize(Policy = "administratorPolicy")]
    [HttpGet("get_all_users")]
    public ActionResult<List<UserDto>> GetUsers()
    {
        var result = _userService.GetAllUsers();
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