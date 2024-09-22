using FluentResults;

namespace StudentSupport.BuildingBlocks.Core.UseCases;

public static class FailureCode
{
    public static readonly IError NonUniqueUsername = new Error("User with supplied username already exists.")
        .WithMetadata("code", 400)
        .WithMetadata("subCode", 1);

    public static readonly IError InvalidArgument = new Error("Invalid data supplied.")
        .WithMetadata("code", 400);
    public static readonly IError Forbidden = new Error("Access to resource is restricted.")
        .WithMetadata("code", 403);
    public static readonly IError NotFound = new Error("Accessed resource not found.")
        .WithMetadata("code", 404);
    public static readonly IError Conflict = new Error("Database persistence conflict exception.")
        .WithMetadata("code", 409);
    public static readonly IError Internal = new Error("Internal server error.")
        .WithMetadata("code", 500);
    public static readonly IError InvalidTokenData = new Error("Data in the token does not match the records in the database.")
    .WithMetadata("code", 400)
    .WithMetadata("subCode", 2);

    public static readonly IError InvalidPassword = new Error("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.")
    .WithMetadata("code", 400)
    .WithMetadata("subCode", 2);
}