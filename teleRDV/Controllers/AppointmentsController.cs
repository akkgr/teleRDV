using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    public class AppointmentsController : ApiController
    {
        private readonly Context db;

        public AppointmentsController(Context ctx)
        {
            db = ctx;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var list = await db.Appointments.Find(t => true).ToListAsync();
            return Ok(list);
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = await db.Appointments.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }
            return this.Ok(obj);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]Appointment value)
        {
            if(value.DateTime < DateTime.Now)
            {
                return BadRequest("Cannot create Appointment in the past");
            }

            value.Status = AppointmentStatus.Open;
            value.UserId = (await db.Users.Find(t => t.UserName == User.Identity.Name).FirstOrDefaultAsync()).Id;

            await db.Appointments.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]Appointment value)
        {
            var obj = await db.Appointments.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<Appointment>.Filter.Eq(e => e.Id, id);
            await db.Appointments.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            await db.Appointments.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }
    }
}