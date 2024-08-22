using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Domain.RepositoryInterfaces;
using StudentSupport.Clubs.Core.Mappers;
using StudentSupport.Clubs.Core.UseCases;
using StudentSupport.Clubs.Infrastructure.Database;
using StudentSupport.Clubs.Infrastructure.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentSupport.Clubs.Infrastructure
{
    public static class ClubsStartup
    {
        public static IServiceCollection ConfigureClubsModule(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ClubsProfile).Assembly);
            SetupCore(services);
            SetupInfrastructure(services);
            return services;
        }

        private static void SetupCore(IServiceCollection services)
        {
            services.AddScoped<IClubService, ClubService>();
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddScoped<IAnnouncementService, AnnouncementService>();

        }

        private static void SetupInfrastructure(IServiceCollection services)
        {
            services.AddScoped(typeof(ICrudRepository<Club>), typeof(CrudDatabaseRepository<Club, ClubsContext>));
            services.AddScoped(typeof(IClubRepository), typeof(ClubDatabaseRepository));
            services.AddScoped(typeof(IMembershipRepository), typeof(MembershipDatabaseRepository));
            services.AddScoped(typeof(IAnnouncementRepository), typeof(AnnouncementDatabaseRepository));

            services.AddDbContext<ClubsContext>(opt =>
                opt.UseNpgsql(DbConnectionStringBuilder.Build("clubs"),
                    x => x.MigrationsHistoryTable("__EFMigrationsHistory", "clubs")));
        }
    }
}
