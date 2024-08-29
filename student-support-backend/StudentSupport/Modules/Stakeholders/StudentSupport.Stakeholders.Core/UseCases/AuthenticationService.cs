using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.Stakeholders.API.Dtos;
using StudentSupport.Stakeholders.API.Public;
using StudentSupport.Stakeholders.Core.Domain;
using StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;

namespace StudentSupport.Stakeholders.Core.UseCases;

public class AuthenticationService : IAuthenticationService
{
    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepository _userRepository;
    private readonly ICrudRepository<Person> _personRepository;
    private readonly IPersonRepository _personRepositoryy;

    public AuthenticationService(IUserRepository userRepository, ICrudRepository<Person> personRepository, ITokenGenerator tokenGenerator, IPersonRepository personRepositoryy)
    {
        _tokenGenerator = tokenGenerator;
        _userRepository = userRepository;
        _personRepository = personRepository;
        _personRepositoryy = personRepositoryy;
    }

    public Result<AuthenticationTokensDto> Login(CredentialsDto credentials)
    {
        var user = _userRepository.GetActiveByName(credentials.Username);
        if (user == null || credentials.Password != user.Password) return Result.Fail(FailureCode.NotFound);

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
            var user = _userRepository.Create(new User(account.Username, account.Password, UserRole.Student, true, false));
            var person = _personRepository.Create(new Person(user.Id, account.Name, account.Surname, account.Email, null, DateOnly.FromDateTime(DateTime.Now), ""));

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
            var user = _userRepository.Create(new User(account.Username, account.Password, UserRole.Author, false, false));
            var person = _personRepository.Create(new Person(user.Id, account.Name, account.Surname, account.Email, null, DateOnly.FromDateTime(DateTime.Now), ""));

            return Result.Ok().WithSuccess("Author successfully registered.");
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
                var user = _userRepository.Create(new User(usernameForStudent, "StudentGmail91#", UserRole.Student, true, true));
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