using Microsoft.EntityFrameworkCore;
using StudentSupport.Clubs.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Infrastructure.Database
{
    public class ClubsContext : DbContext
    {
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<ClubReport> Reports { get; set; }

        public ClubsContext(DbContextOptions<ClubsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("clubs");

            ConfigureClubs(modelBuilder);
        }

        private static void ConfigureClubs(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Club>()
                .HasMany(c => c.Memberships)
                .WithOne()
                .HasForeignKey(m => m.ClubId);

            modelBuilder.Entity<Club>()
                .HasMany(c => c.Announcements)
                .WithOne()
                .HasForeignKey(a => a.ClubId);
        }
    }
}
