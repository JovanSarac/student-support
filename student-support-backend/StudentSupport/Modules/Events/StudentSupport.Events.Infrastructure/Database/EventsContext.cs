using Microsoft.EntityFrameworkCore;
using StudentSupport.Events.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Infrastructure.Database
{
    public class EventsContext : DbContext
    {
        public DbSet<Event> Events { get; set; }

        public EventsContext(DbContextOptions<EventsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("events");
        }

        
    }
}
