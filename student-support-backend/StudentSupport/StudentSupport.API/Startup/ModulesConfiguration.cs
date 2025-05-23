using StudentSupport.Stakeholders.Infrastructure;
using StudentSupport.Events.Infrastructure;
using StudentSupport.Clubs.Infrastructure;

namespace StudentSupport.API.Startup;

public static class ModulesConfiguration
{
    public static IServiceCollection RegisterModules(this IServiceCollection services)
    {
        services.ConfigureStakeholdersModule();
        services.ConfigureEventsModule();
        services.ConfigureClubsModule();

        return services;
    }
}