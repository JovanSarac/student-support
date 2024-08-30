using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.Core.Domain;
using FluentResults;

namespace StudentSupport.Stakeholders.Core.UseCases;

public interface ITokenGenerator
{
    Result<AuthenticationTokensDto> GenerateAccessToken(User user, long personId);
    string GenerateEmailVerificationToken(string email, string username, string name, string registrationDate);
    string GetDataFromToken(string jwtToken, string dataName);
}