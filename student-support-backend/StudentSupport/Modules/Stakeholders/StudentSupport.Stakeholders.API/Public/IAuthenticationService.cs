using StudentSupport.Stakeholders.API.Dtos;
using FluentResults;

namespace StudentSupport.Stakeholders.API.Public;

public interface IAuthenticationService
{
    Result<AuthenticationTokensDto> Login(CredentialsDto credentials);
    Result RegisterStudent(AccountRegistrationDto account);
    Result<AuthenticationTokensDto> LoginStudentGmail(AccountRegistrationGmailDto account);
    Result RegisterAuthor(AccountRegistrationDto account);
    Result VerifyUser(string token);
}