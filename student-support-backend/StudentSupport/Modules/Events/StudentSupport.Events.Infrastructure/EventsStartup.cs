using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentSupport.BuildingBlocks.Infrastructure.Database;
using StudentSupport.Events.Core.Mappers;
using StudentSupport.Events.Infrastructure.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Events.Infrastructure
{
    public static class EventsStartup
    {
        public static IServiceCollection ConfigureEventsModule(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(EventsProfile).Assembly);
            SetupCore(services);
            SetupInfrastructure(services);
            return services;
        }

        private static void SetupCore(IServiceCollection services)
        {
            
        }

        private static void SetupInfrastructure(IServiceCollection services)
        {
            

            services.AddDbContext<EventsContext>(opt =>
                opt.UseNpgsql(DbConnectionStringBuilder.Build("events"),
                    x => x.MigrationsHistoryTable("__EFMigrationsHistory", "events")));
        }
    }
}
