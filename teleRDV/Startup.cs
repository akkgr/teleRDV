using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.Owin.Security.OAuth;
using Owin;
using Serilog;
using System;
using System.Reflection;
using System.Web;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            Models.Context.Init();
            HttpConfiguration config = new HttpConfiguration();

            var builder = new ContainerBuilder();
            builder.RegisterType<Models.Context>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationRoleStore>().As<IRoleStore<Role>>().InstancePerRequest();
            builder.RegisterType<ApplicationUserStore>().As<IUserStore<User>>().InstancePerRequest();
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationRoleManager>().AsSelf().InstancePerRequest();
            builder.RegisterType<ApplicationSignInManager>().AsSelf().InstancePerRequest();
            builder.Register<IAuthenticationManager>(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
            builder.Register<IDataProtectionProvider>(c => app.GetDataProtectionProvider()).InstancePerRequest();

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
            var resolver = new AutofacWebApiDependencyResolver(container);
            config.DependencyResolver = resolver;

            app.UseAutofacMiddleware(container);

            ConfigureAuth(app);
            WebApiConfig.Register(config);
            
                       
            app.UseAutofacWebApi(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);            
        }
    }
}