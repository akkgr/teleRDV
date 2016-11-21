using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    public class CallQueuesController : ApiController
    {
        private readonly Context db;

        public CallQueuesController(Context ctx)
        {
            this.db = ctx;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<CallQueue>> Get()
        {
            return await db.CallQueues.Find(t => true).ToListAsync();
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = new CallQueue();
            if (id != "new")
            {
                obj = await db.CallQueues.Find(t => t.Id == id).FirstOrDefaultAsync();
                if (obj == null)
                {
                    return this.NotFound();
                }
            }
            return this.Ok(obj);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]CallQueue value)
        {
            value.Inserted = DateTime.Now;
            await db.CallQueues.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]CallQueue value)
        {
            var obj = await db.CallQueues.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<CallQueue>.Filter.Eq(e => e.Id, id);
            await db.CallQueues.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            await db.CallQueues.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }
    }
}