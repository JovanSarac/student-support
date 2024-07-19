using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;
using StudentSupport.Events.API.Public;
using StudentSupport.Events.Core.Domain;
using StudentSupport.Events.Core.Domain.RepositoryInterfaces;
using StudentSupport.Events.Core.Mappers;
using StudentSupport.Events.Core.UseCases;
using StudentSupport.Events.Infrastructure.Database;
using StudentSupport.Events.Infrastructure.Database.Repositories;
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
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IParticipationService, ParticipationService>();
        }

        private static void SetupInfrastructure(IServiceCollection services)
        {
            services.AddScoped(typeof(ICrudRepository<Event>), typeof(CrudDatabaseRepository<Event, EventsContext>));
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped(typeof(IParticipationRepository), typeof(ParticipationDatabaseRepository));

            services.AddDbContext<EventsContext>(opt =>
                opt.UseNpgsql(DbConnectionStringBuilder.Build("events"),
                    x => x.MigrationsHistoryTable("__EFMigrationsHistory", "events")));
        }
    }
}
