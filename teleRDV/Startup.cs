using Owin;
using System.Web.Http;

namespace teleRDV
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            Models.Context.Init();
            EnsureAuthIndexes.Exist();
            
            app.Use(typeof(GlobalExceptionMiddleware));

            ConfigureAuth(app);

            WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
        }
    }
}