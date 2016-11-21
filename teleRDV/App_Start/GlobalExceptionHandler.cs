using Serilog;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace teleRDV
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        private ILogger logger;

        public GlobalExceptionHandler(ILogger log)
        {
            logger = log;
        }

        public override void Handle(ExceptionHandlerContext context)
        {
            context.Result = new TextPlainErrorResult
            {
                Request = context.ExceptionContext.Request,
                Content = context.Exception.Message
            };

            logger.Error(context.Exception.Message);
        }

        public class TextPlainErrorResult : IHttpActionResult
        {
            public HttpRequestMessage Request { get; set; }

            public string Content { get; set; }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                HttpResponseMessage response =
                                 new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(Content);
                response.RequestMessage = Request;
                return Task.FromResult(response);
            }
        }
    }
}