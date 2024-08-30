using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.Core.Domain;
using StudentSupport.Stakeholders.Core.UseCases;
using FluentResults;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Collections.Generic;

namespace StudentSupport.Stakeholders.Infrastructure.Authentication;

public class JwtGenerator : ITokenGenerator
{
    private readonly string _key = Environment.GetEnvironmentVariable("JWT_KEY") ?? "studentsupport_secret_key";   
    private readonly string _issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "studentsupport";
    private readonly string _audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "studentsupport-front.com";

    public Result<AuthenticationTokensDto> GenerateAccessToken(User user, long personId)
    {
        var authenticationResponse = new AuthenticationTokensDto();

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new("id", user.Id.ToString()),
            new("username", user.Username),
            new("personId", personId.ToString()),
            new(ClaimTypes.Role, user.GetPrimaryRoleName())
        };
            
        var jwt = CreateToken(claims, 60*24);
        authenticationResponse.Id = user.Id;
        authenticationResponse.AccessToken = jwt;
            
        return authenticationResponse;
    }
        
    private string CreateToken(IEnumerable<Claim> claims, double expirationTimeInMinutes)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _issuer,
            _audience,
            claims,
            expires: DateTime.Now.AddMinutes(expirationTimeInMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateEmailVerificationToken(string email, string username, string name, string registrationDate)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new("username", username),
            new("email", email),
            new("name", name),
            new("dateRegistration", registrationDate)
        };

        var jwt = CreateToken(claims, 60 * 24);


        return jwt;
    }

    public string GetDataFromToken(string jwtToken, string dataName)
    {
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(jwtToken) as JwtSecurityToken;

        if (jsonToken?.Payload != null && jsonToken.Payload.TryGetValue(dataName, out var userEmail))
        {
            if (userEmail is string userEmailString)
            {
                return userEmailString;
            }
        }

        return null;
    }
}