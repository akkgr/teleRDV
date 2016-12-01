using MongoDB.Driver;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    [RoutePrefix("api/subscribers")]
    public class SubscribersController : ApiController
    {
        private readonly Context db;

        public SubscribersController(Context ctx)
        {
            this.db = ctx;
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

        [HttpGet]
        [Route("{id}/{year}/{month}/{day}")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Get(string id, int year, int month, int day)
        {
            List<List<DateTime>> days = new List<List<DateTime>>();
            
            var d = new DateTime(year, month, day);
            var obj = await db.Subscribers.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            while(days.Count < 7)
            {                
                var s = obj.WorkSchedule.DayEntries.FirstOrDefault(t => t.WeekDay == d.DayOfWeek);
                var tmp = new List<DateTime>();
                if (s.Active)
                {                    
                    foreach(var te in s.TimeEntries)
                    {
                        var es = d.AddHours(te.StartHour).AddMinutes(te.StartMinute);
                        var ee = d.AddHours(te.EndHour).AddMinutes(te.EndMinute);

                        while(es <= ee)
                        {
                            tmp.Add(es);
                            es = es.AddMinutes(obj.RdvDuration);
                        }
                    }
                }
                else
                {
                    tmp.Add(d);
                }
                days.Add(tmp);
                d = d.AddDays(1);
            }
            
            return this.Ok(days);
        }
    }
}