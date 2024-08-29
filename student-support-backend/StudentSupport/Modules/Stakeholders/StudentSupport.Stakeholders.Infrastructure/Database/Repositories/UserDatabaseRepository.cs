using StudentSupport.Stakeholders.Core.Domain;
using StudentSupport.Stakeholders.Core.Domain.RepositoryInterfaces;
using System.Collections.Generic;
using System.Linq;

namespace StudentSupport.Stakeholders.Infrastructure.Database.Repositories;

public class UserDatabaseRepository : IUserRepository
{
    private readonly StakeholdersContext _dbContext;

    public UserDatabaseRepository(StakeholdersContext dbContext)
    {
        _dbContext = dbContext;
    }

    public bool Exists(string username)
    {
        return _dbContext.Users.Any(user => user.Username == username);
    }

    public User? GetActiveByName(string username)
    {
        return _dbContext.Users.FirstOrDefault(user => user.Username == username && user.IsActive && user.RegisterWithEmail == false);
    }

    public User Create(User user)
    {
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
        return user;
    }

    public long GetPersonId(long userId)
    {
        var person = _dbContext.People.FirstOrDefault(i => i.UserId == userId);
        if (person == null) throw new KeyNotFoundException("Not found.");
        return person.Id;
    }

    public User GetById(long id)
    {
        var user = _dbContext.Users.FirstOrDefault(x => x.Id == id);
        return user;
    }

    public void SaveChanges()
    {
        _dbContext.SaveChanges();
    }

    public List<User> GetAll()
    {
        return _dbContext.Users.ToList();
    }

    public User Update(User newUser)
    {
        var user = _dbContext.Users.FirstOrDefault(x => x.Id == newUser.Id);
        user = newUser;
        _dbContext.SaveChanges();
        return user;
    }
}