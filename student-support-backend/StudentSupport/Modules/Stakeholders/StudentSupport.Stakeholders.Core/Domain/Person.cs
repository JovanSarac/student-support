using StudentSupport.BuildingBlocks.Core.Domain;
using System.Net.Mail;

namespace StudentSupport.Stakeholders.Core.Domain;

public class Person : Entity
{
    public long UserId { get; init; }
    public string Name { get; init; }
    public string Surname { get; init; }
    public string Email { get; init; }
    public byte[]? ProfilePic { get; init; }
    public DateOnly RegistrationDate { get; init; }
    public string? Address { get; init; }
    public string? PhoneNumber { get; init; }
    public DateOnly? BirthDate { get; init; }
    public string? Biography { get; init; }

    public Person()
    {

    }

    public Person(long userId, string name, string surname, string email, byte[]? profilePic, DateOnly registrationDate, string biography)
    {
        UserId = userId;
        Name = name;
        Surname = surname;
        Email = email;
        ProfilePic = profilePic;
        RegistrationDate = registrationDate;
        Biography = biography;
        Validate();
    }

    private void Validate()
    {
        if (UserId == 0) throw new ArgumentException("Invalid UserId");
        if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
        if (string.IsNullOrWhiteSpace(Surname)) throw new ArgumentException("Invalid Surname");
        if (!MailAddress.TryCreate(Email, out _)) throw new ArgumentException("Invalid Email");
    }
}