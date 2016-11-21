using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class UsersController : ApiController
    {
        private readonly Context db;
        private readonly ApplicationUserManager userManager;

        public UsersController(Context ctx, ApplicationUserManager um)
        {
            this.db = ctx;
            this.userManager = um;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await db.Users.Find(t => true).ToListAsync();
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return this.NotFound();
            }
            return this.Ok(user);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]User value)
        {
            var result = await userManager.CreateAsync(value, value.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]User value)
        {
            var user = await userManager.FindByIdAsync(id);

            user.UserName = value.UserName;
            user.Email = value.Email;
            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            result = await userManager.AddUserToRolesAsync(user.Id, value.Roles.Except(user.Roles).ToList<string>());
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            result = await userManager.RemoveUserFromRolesAsync(user.Id, user.Roles.Except(value.Roles).ToList<string>());
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            return this.Ok(user);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return this.NotFound();
            }

            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors);
                return this.BadRequest(errors);
            }

            return this.Ok();
        }
    }
}