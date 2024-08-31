using Konscious.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.BuildingBlocks.Core.Security
{
    public class PasswordHasher
    {
        private static readonly int HashSize = 64;
        private static readonly int SaltSize = 16;
        private static readonly byte[] Pepper = Encoding.UTF8.GetBytes("StuUNSdent#9189");

        public static string HashPassword(string password)
        {
            var salt = GenerateSalt(SaltSize);
            var hash = ComputeHash(password, salt);
            var combined = CombineHashAndSalt(hash, salt);

            return Convert.ToBase64String(combined);
        }

        public static bool VerifyPassword(string rawPassword, string hashedPassword)
        {
            var (hash, salt) = SeparateHashAndSalt(Convert.FromBase64String(hashedPassword));
            var rawHashed = ComputeHash(rawPassword, salt);

            return hash.SequenceEqual(rawHashed);
        }

        private static byte[] ComputeHash(string password, byte[] salt)
        {
            var argon2 = new Argon2i(Encoding.UTF8.GetBytes(password))
            {
                DegreeOfParallelism = 2,
                MemorySize = 8192,
                Iterations = 10,
                Salt = salt,
                KnownSecret = Pepper
            };

            return argon2.GetBytes(HashSize);
        }

        private static byte[] GenerateSalt(int byteSize)
        {
            return RandomNumberGenerator.GetBytes(byteSize);
        }

        private static byte[] CombineHashAndSalt(byte[] hash, byte[] salt)
        {
            byte[] combined = new byte[HashSize + SaltSize];
            Buffer.BlockCopy(hash, 0, combined, 0, HashSize);
            Buffer.BlockCopy(salt, 0, combined, HashSize, SaltSize);

            return combined;
        }

        private static (byte[] hash, byte[] salt) SeparateHashAndSalt(byte[] combined)
        {
            byte[] hash = new byte[HashSize];
            byte[] salt = new byte[SaltSize];
            Buffer.BlockCopy(combined, 0, hash, 0, HashSize);
            Buffer.BlockCopy(combined, HashSize, salt, 0, SaltSize);

            return (hash, salt);
        }
    }

}
