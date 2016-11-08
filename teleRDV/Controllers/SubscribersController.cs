using teleRDV.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace teleRDV.Controllers
{
    public class SubscribersController : ApiController
    {
        private readonly Context db;

        public SubscribersController()
        {
            this.db = new Context();
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<Subscriber>> Get()
        {
            return await db.Subscribers.Find(t => true).ToListAsync();
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = new Subscriber();
            if (id != "new")            
            {
                obj = await db.Subscribers.Find(t => t.Id == id).FirstOrDefaultAsync();
                if (obj == null)
                {
                    return this.NotFound();
                }
            }
            return this.Ok(obj);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]Subscriber value)
        {
            await db.Subscribers.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]Subscriber value)
        {
            var obj = await db.Subscribers.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<Subscriber>.Filter.Eq(e => e.Id, id);
            await db.Subscribers.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {            
            await db.Subscribers.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }
    }
}