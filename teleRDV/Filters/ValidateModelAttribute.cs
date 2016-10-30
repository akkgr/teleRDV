using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace teleRDV
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                var msg = string.Empty;
                var errors = actionContext.ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
                foreach (var error in errors)
                {
                    foreach (var item in error)
                    {
                        var s = string.IsNullOrEmpty(item.ErrorMessage) ? item.Exception.Message : item.ErrorMessage;
                        msg += Environment.NewLine + s;
                    }
                }
                actionContext.Response = actionContext.Request.CreateErrorResponse(
                    HttpStatusCode.BadRequest, msg);
            }
        }
    }
}