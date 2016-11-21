using Serilog;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace teleRDV
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private ILogger logger;

        public CustomExceptionFilterAttribute(ILogger log)
        {
            logger = log;
        }

        public override void OnException(HttpActionExecutedContext context)
        {
            string msg = context.Exception.Message;
            Exception tmp = context.Exception;

            while (tmp.InnerException != null)
            {
                tmp = tmp.InnerException;
                msg += Environment.NewLine + tmp.Message;
            }

            logger.Error(msg);

            context.Response = context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, msg);
        }
    }
}