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

        public ClubsContext(DbContextOptions<ClubsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("clubs");
        }
    }
}
