using Microsoft.Owin;
using NLog;
using System;
using System.Threading.Tasks;

namespace teleRDV
{
    public class GlobalExceptionMiddleware : OwinMiddleware
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        public GlobalExceptionMiddleware(OwinMiddleware next) : base(next)
        { }

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