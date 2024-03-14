using Microsoft.AspNetCore.Mvc;

namespace StudentSupport.API.Controllers;

[ApiController]
public class ErrorsController : ControllerBase
{
    [HttpGet]
    [Route("/error")]
    public IActionResult HandleErrors() => Problem();
}