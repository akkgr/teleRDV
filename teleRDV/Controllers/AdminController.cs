using teleRDV.Models;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace teleRDV.Controllers
{
    public class AdminController : ApiController
    {
        private readonly ApplicationUserManager userManager;

        public AdminController()
        {
            this.userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        }
        
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]ApplicationUser value)
        {
            var user = await userManager.FindByNameAsync(value.UserName);
            var token = await userManager.GeneratePasswordResetTokenAsync(user.Id);
            var result = await userManager.ResetPasswordAsync(user.Id, token, value.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            return this.Ok();
        }
        
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromBody]ApplicationUser value)
        {
            if(value.NewPassword != value.ConfirmPassword)
            {
                return this.BadRequest("New Password mismatch.");
            }
            
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var result = await userManager.ChangePasswordAsync(user.Id, value.OldPassword, value.NewPassword);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            return this.Ok();
        }
    }
}
