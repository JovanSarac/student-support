﻿using StudentSupport.BuildingBlocks.Core.Domain;
using System.Net.Mail;

namespace StudentSupport.Stakeholders.Core.Domain;

public class Person : Entity
{
    public long UserId { get; init; }
    public string Name { get; init; }
    public string Surname { get; init; }
    public string Email { get; init; }
    public string ProfilePic { get; init; }

    public Person(long userId, string name, string surname, string email)
    {
        UserId = userId;
        Name = name;
        Surname = surname;
        Email = email;
        Validate();
    }

    public  Person(long userId, string name, string surname, string email, string profilePic) : this(userId, name, surname, email)
    {
        ProfilePic = profilePic;
    }

    private void Validate()
    {
        if (UserId == 0) throw new ArgumentException("Invalid UserId");
        if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
        if (string.IsNullOrWhiteSpace(Surname)) throw new ArgumentException("Invalid Surname");
        if (!MailAddress.TryCreate(Email, out _)) throw new ArgumentException("Invalid Email");
    }
}