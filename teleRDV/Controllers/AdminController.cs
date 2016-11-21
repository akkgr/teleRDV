using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    public class AdminController : ApiController
    {
        private readonly ApplicationUserManager userManager;

        public AdminController(ApplicationUserManager um)
        {
            this.userManager = um;
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]User value)
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
        public async Task<IHttpActionResult> Put([FromBody]User value)
        {
            if (value.NewPassword != value.ConfirmPassword)
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