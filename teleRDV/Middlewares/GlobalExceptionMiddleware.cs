using Microsoft.Owin;
using Serilog;
using System;
using System.Threading.Tasks;

namespace teleRDV
{
    public class GlobalExceptionMiddleware : OwinMiddleware
    {
        private ILogger logger;
        
        public GlobalExceptionMiddleware(OwinMiddleware next, ILogger log) : base(next)
        {
            logger = log;
        }

        public override async Task Invoke(IOwinContext context)
        {
            try
            {
                await Next.Invoke(context);
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                Exception tmp = ex;

                while (tmp.InnerException != null)
                {
                    tmp = tmp.InnerException;
                    msg += Environment.NewLine + tmp.Message;
                }

                logger.Error(msg);
            }
        }
    }
}