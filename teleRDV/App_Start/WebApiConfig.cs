using FluentValidation.WebApi;
using Serilog;
using System.Web.Http;

namespace teleRDV
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var log = config.DependencyResolver.GetService(typeof(ILogger)) as ILogger;
            //config.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler(log));
            //config.Services.Replace(typeof(IExceptionLogger), new UnhandledExceptionLogger(log));

            config.Filters.Add(new AuthorizeAttribute());
            config.Filters.Add(new CustomExceptionFilterAttribute(log));
            config.Filters.Add(new ValidateModelAttribute());

            // Web API configuration and services
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            //config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            FluentValidationModelValidatorProvider.Configure(config);
        }
    }
}