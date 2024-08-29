﻿namespace StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;

public interface IUserRepository
{
    bool Exists(string username);
    User? GetActiveByName(string username);
    User Create(User user);
    long GetPersonId(long userId);
    User GetById(long id);
    void SaveChanges();
    List<User> GetAll();
    User Update(User newUser);
}