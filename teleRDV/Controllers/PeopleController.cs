using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    [RoutePrefix("api/people")]
    public class PeopleController : ApiController
    {
        private readonly Context db;

        public PeopleController(Context ctx)
        {
            db = ctx;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var list = await db.People.Find(t => true).ToListAsync();
            return Ok(list);
        }

        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = await db.People.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            return this.Ok(obj);
        }
        
        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]Person value)
        {
            await db.People.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]Person value)
        {
            var obj = await db.People.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<Person>.Filter.Eq(e => e.Id, id);
            await db.People.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            {
                var builder = Builders<Appointment>.Filter;
                var filter = builder.Eq("PersonId", id);
                var result = await db.Appointments.Find(filter).CountAsync();
                if (result > 0)
                {
                    return this.BadRequest(Resources.Error.PersonHasAppointments);
                }
            }

            {
                var builder = Builders<CallEntry>.Filter;
                var filter = builder.Eq("PersonId", id);
                var result = await db.CallEntries.Find(filter).CountAsync();
                if (result > 0)
                {
                    return this.BadRequest(Resources.Error.PersonHasCalls);
                }
            }

            await db.People.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }

        [HttpGet]
        [Route("phone/{phone}")]
        public async Task<IHttpActionResult> GetByPhne(string phone)
        {
            var builder = Builders<Person>.Filter;
            var filter = builder.Eq("Phones.Value", phone);
            var result = await db.People.Find(filter).ToListAsync();
            return this.Ok(result);
        }
    }
}