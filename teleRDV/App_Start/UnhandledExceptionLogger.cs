using Serilog;
using System.Web.Http.ExceptionHandling;

namespace teleRDV
{
    public class UnhandledExceptionLogger : ExceptionLogger
    {
        private ILogger logger;

        public UnhandledExceptionLogger(ILogger log)
        {
            logger = log;
        }

        public override void Log(ExceptionLoggerContext context)
        {
            var log = context.Exception.ToString();
            //Do whatever logging you need to do here.
        }
    }
}