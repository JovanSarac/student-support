using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using StudentSupport.Stakeholders.Core.Domain;
using StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System.Security.Principal;
using System;

namespace StudentSupport.Stakeholders.Core.UseCases;

public class AuthenticationService : IAuthenticationService
{
    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;
    private readonly ICrudRepository<Person> _personRepository;
    private readonly IPersonRepository _personRepositoryy;
    private readonly IEmailSendingService _emailSendingService;

    public AuthenticationService(IUserRepository userRepository, ICrudRepository<Person> personRepository, ITokenGenerator tokenGenerator, IPersonRepository personRepositoryy, IEmailSendingService emailSendingService)
    {
        _tokenGenerator = tokenGenerator;
        _userRepository = userRepository;
        _personRepository = personRepository;
        _personRepositoryy = personRepositoryy;
        _emailSendingService = emailSendingService;
    }

    public Result<AuthenticationTokensDto> Login(CredentialsDto credentials)
    {
        var user = _userRepository.GetActiveByName(credentials.Username);
        if (user == null || credentials.Password != user.Password) return Result.Fail(FailureCode.NotFound);

        if (user.EmailVerificationToken != null)
            return Result.Fail("Email is not verified.");

        if (!user.IsActive)
            return Result.Fail("User account is not active.");

        long personId;
        try
        {
            personId = _userRepository.GetPersonId(user.Id);
        }
        catch (KeyNotFoundException)
        {
            personId = 0;
        }
        return _tokenGenerator.GenerateAccessToken(user, personId);
    }

    public Result RegisterStudent(AccountRegistrationDto account)
    {
        if(_userRepository.Exists(account.Username)) return Result.Fail(FailureCode.NonUniqueUsername);

        try
        {
            var user = _userRepository.Create(new User(account.Username, account.Password, UserRole.Student, true, false, false));
            var person = _personRepository.Create(new Person(user.Id, account.Name, account.Surname, account.Email, null, DateOnly.FromDateTime(DateTime.Now), ""));

            var emailVerificationToken = _tokenGenerator.GenerateEmailVerificationToken(person.Email, user.Username, person.Name, person.RegistrationDate.ToString());
            user.EmailVerificationToken = emailVerificationToken;
            user = _userRepository.Update(user);

            _emailSendingService.SendVerificationEmail(person.Id, emailVerificationToken, person.Email);
            return Result.Ok().WithSuccess("Student successfully registered.");
        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }

    public Result RegisterAuthor(AccountRegistrationDto account)
    {
        if (_userRepository.Exists(account.Username)) return Result.Fail(FailureCode.NonUniqueUsername);

        try
        {
            var user = _userRepository.Create(new User(account.Username, account.Password, UserRole.Author, false, false, false));
            var person = _personRepository.Create(new Person(user.Id, account.Name, account.Surname, account.Email, null, DateOnly.FromDateTime(DateTime.Now), ""));

            var emailVerificationToken = _tokenGenerator.GenerateEmailVerificationToken(person.Email, user.Username, person.Name, person.RegistrationDate.ToString());
            user.EmailVerificationToken = emailVerificationToken;
            user = _userRepository.Update(user);

            _emailSendingService.SendVerificationEmail(person.Id, emailVerificationToken, person.Email);
            return Result.Ok().WithSuccess("Author successfully registered.");
        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }

    public Result VerifyUser(string token)
    {
        try
        {
            var user = _userRepository.GetByUsername(_tokenGenerator.GetDataFromToken(token, "username"));
            if(user == null) return Result.Fail(FailureCode.NotFound);

            if(user.IsVerified == true) return Result.Ok().WithSuccess("User is already verified.");

            var person = _personRepository.Get(user.Id);

            if(person.Email != _tokenGenerator.GetDataFromToken(token, "email") || 
                person.Name != _tokenGenerator.GetDataFromToken(token, "name") || 
                person.RegistrationDate.ToString() != _tokenGenerator.GetDataFromToken(token, "dateRegistration"))
            {
                return Result.Fail(FailureCode.InvalidTokenData);
            }

            user.VerifiyUser();
            _userRepository.Update(user);

            return Result.Ok().WithSuccess("User successfully verified.");
        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }

    public Result<AuthenticationTokensDto> LoginStudentGmail(AccountRegistrationGmailDto account)
    {
        try
        {
            var personFromDatabase = _personRepositoryy.GetByEmailWithGmail(account.Email);
            if (personFromDatabase == null)
            {
                string usernameForStudent = account.Name + account.Surname;
                if(_userRepository.Exists(usernameForStudent))
                {
                    usernameForStudent = GenerateUsernameForStudent(usernameForStudent);
                }
                var user = _userRepository.Create(new User(usernameForStudent, "StudentGmail91#", UserRole.Student, true, true, true));
                personFromDatabase = _personRepository.Create(new Person(user.Id, account.Name, account.Surname, account.Email, null, DateOnly.FromDateTime(DateTime.Now), ""));
                return _tokenGenerator.GenerateAccessToken(user, personFromDatabase.Id);
            }
            else
            {             
                var user = _userRepository.GetById(personFromDatabase.Id);
                return _tokenGenerator.GenerateAccessToken(user, personFromDatabase.Id);
            }

        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }

    private string GenerateUsernameForStudent(string usernameForStudent)
    {
        int i = 0;
        while(_userRepository.Exists(usernameForStudent))
        {
            usernameForStudent +=  i.ToString();
            i++;
        }
        return usernameForStudent;
    }
}