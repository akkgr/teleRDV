using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    public class SocialSecurityFundsController : ApiController
    {
        private readonly Context db;

        public SocialSecurityFundsController(Context ctx)
        {
            this.db = ctx;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var list = await db.SocialSecurityFunds.Find(t => true).ToListAsync();
            return Ok(list);
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = await db.SocialSecurityFunds.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }
            return this.Ok(obj);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]SocialSecurityFund value)
        {
            await db.SocialSecurityFunds.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]SocialSecurityFund value)
        {
            var obj = await db.SocialSecurityFunds.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<SocialSecurityFund>.Filter.Eq(e => e.Id, id);
            await db.SocialSecurityFunds.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            {
                var builder = Builders<Subscriber>.Filter;
                var filter = builder.Eq("SocialSecurityFundId", id);
                var result = await db.Subscribers.Find(filter).CountAsync();
                if (result > 0)
                {
                    return this.BadRequest(Resources.Error.SocialSecurityFundHasSubscribers);
                }
            }

            await db.SocialSecurityFunds.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }
    }
}