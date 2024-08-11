using StudentSupport.Stakeholders.API.Dtos;
using FluentResults;

namespace StudentSupport.Stakeholders.API.Public;

public interface IAuthenticationService
{
    Result<AuthenticationTokensDto> Login(CredentialsDto credentials);
    Result<AuthenticationTokensDto> RegisterStudent(AccountRegistrationDto account);
    Result<AuthenticationTokensDto> LoginStudentGmail(AccountRegistrationGmailDto account);
    Result<AuthenticationTokensDto> RegisterAuthor(AccountRegistrationDto account);
}