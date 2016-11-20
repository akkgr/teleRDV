using Autofac;
using Autofac.Integration.WebApi;
using Owin;
using Serilog;
using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace teleRDV
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();           

            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(config);

            builder.Register<ILogger>((c, p) =>
            {
                return new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.RollingFile(AppDomain.CurrentDomain.BaseDirectory + "logs\\log-{Date}.txt")
                .CreateLogger();
            }).SingleInstance();

            builder.RegisterType<GlobalExceptionMiddleware>().InstancePerRequest();
                       
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            
            Models.Context.Init();
            EnsureAuthIndexes.Exist();                                    
            WebApiConfig.Register(config);
            ConfigureAuth(app);

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }
    }
}