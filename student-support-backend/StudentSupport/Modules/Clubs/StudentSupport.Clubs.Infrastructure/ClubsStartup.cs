using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentSupport.BuildingBlocks.Core.UseCases;
using StudentSupport.BuildingBlocks.Infrastructure.Database;
using StudentSupport.Clubs.API.Public;
using StudentSupport.Clubs.Core.Domain;
using StudentSupport.Clubs.Core.Mappers;
using StudentSupport.Clubs.Core.UseCases;
using StudentSupport.Clubs.Infrastructure.Database;
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

        }

        private static void SetupInfrastructure(IServiceCollection services)
        {
            services.AddScoped(typeof(ICrudRepository<Club>), typeof(CrudDatabaseRepository<Club, ClubsContext>));

            services.AddDbContext<ClubsContext>(opt =>
                opt.UseNpgsql(DbConnectionStringBuilder.Build("clubs"),
                    x => x.MigrationsHistoryTable("__EFMigrationsHistory", "clubs")));
        }
    }
}
