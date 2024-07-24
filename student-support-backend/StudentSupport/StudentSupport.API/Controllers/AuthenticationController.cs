using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using Microsoft.AspNetCore.Mvc;

namespace StudentSupport.API.Controllers;

[Route("api/users")]
public class AuthenticationController : BaseApiController
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("student")]
    public ActionResult<AuthenticationTokensDto> RegisterStudent([FromBody] AccountRegistrationDto account)
    {
        var result = _authenticationService.RegisterStudent(account);
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