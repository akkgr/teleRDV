using AspNet.Identity.MongoDB;
using Microsoft.AspNet.Identity;
using MongoDB.Bson.Serialization.Attributes;
using System.Security.Claims;
using System.Threading.Tasks;

namespace teleRDV.Models
{
    public class User : IdentityUser
    {
        [BsonIgnore]
        public string Password { get; set; }
        [BsonIgnore]
        public string OldPassword { get; set; }
        [BsonIgnore]
        public string NewPassword { get; set; }
        [BsonIgnore]
        public string ConfirmPassword { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }
}