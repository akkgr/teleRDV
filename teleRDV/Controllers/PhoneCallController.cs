using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    [RoutePrefix("api/phonecall")]
    public class PhoneCallController : ApiController
    {
        private readonly Context db;

        public PhoneCallController(Context ctx)
        {
            this.db = ctx;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<CallEntry>> Get()
        {
            return await db.CallQueue.Find(t => true).ToListAsync();
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = new CallEntry();
            if (id != "new")
            {
                obj = await db.CallQueue.Find(t => t.Id == id).FirstOrDefaultAsync();
                if (obj == null)
                {
                    return this.NotFound();
                }
            }
            return this.Ok(obj);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]CallEntry value)
        {
            value.Started = DateTime.Now;
            await db.CallQueue.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]CallEntry value)
        {
            var obj = await db.CallQueue.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<CallEntry>.Filter.Eq(e => e.Id, id);
            await db.CallQueue.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            await db.CallQueue.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }

        // POST api/values
        [Route("start/{line}")]
        [HttpGet]        
        public async Task<IHttpActionResult> Start(string line)
        {
            var user = await db.Users.Find(t => t.UserName == User.Identity.Name).FirstOrDefaultAsync();
            var sub = await db.Subscribers.Find(t => t.CallNumber == line).FirstOrDefaultAsync();

            if(sub==null)
            {
                return NotFound();
            }

            CallEntry obj = new CallEntry();
            obj.Line = line;
            obj.CallType = CallType.Inbound;
            obj.Started = DateTime.Now;
            obj.Status = CallStatus.Pending;
            obj.UserId = user.Id;
            
            return Ok( new { CallEntry = obj, Subscriber = sub });
        }
    }
}