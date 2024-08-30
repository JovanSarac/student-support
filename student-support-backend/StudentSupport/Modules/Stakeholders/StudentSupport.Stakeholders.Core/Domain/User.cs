using StudentSupport.BuildingBlocks.Core.Domain;

namespace StudentSupport.Stakeholders.Core.Domain;

public class User : Entity
{
    public string Username { get; private set; }
    public string Password { get; private set; }
    public UserRole Role { get; private set; }
    public bool IsActive { get; set; }
    public bool RegisterWithEmail { get; set; }
    public string? EmailVerificationToken { get; set; }
    public bool IsVerified { get; set; }

    public User(string username, string password, UserRole role, bool isActive, bool registerWithEmail, bool isVerified, string emailVerificationToken = null)
    {
        Username = username;
        Password = password;
        Role = role;
        IsActive = isActive;
        RegisterWithEmail = registerWithEmail;
        EmailVerificationToken = emailVerificationToken;
        IsVerified = isVerified;
        Validate();
    }

    private void Validate()
    {
        if (string.IsNullOrWhiteSpace(Username)) throw new ArgumentException("Invalid Name");
        if (string.IsNullOrWhiteSpace(Password)) throw new ArgumentException("Invalid Surname");
    }

    public string GetPrimaryRoleName()
    {
        return Role.ToString().ToLower();
    }

    public void ActivateUser()
    {
        Validate();
        IsActive = true;
    }

    public void DeactivateUser()
    {
        Validate();
        IsActive = false;
    }

    public void VerifiyUser()
    {
        IsVerified = true;
        EmailVerificationToken = null;
    }
}

public enum UserRole
{
    Administrator,
    Student,
    Author

}