using teleRDV.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace teleRDV.Controllers
{
    public class PaymentMethodsController : ApiController
    {
        private readonly Context db;

        public PaymentMethodsController()
        {
            this.db = new Context();
        }

        // GET: api/values
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var list = await db.PaymentMethods.Find(t => true).ToListAsync();
            return Ok(list);
        }
        
        // GET api/values/5
        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            var obj = await db.PaymentMethods.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }
            return this.Ok(obj);
        }

        // POST api/values
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]PaymentMethod value)
        {
            await db.PaymentMethods.InsertOneAsync(value);
            return this.Ok(value);
        }

        // PUT api/values/5
        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody]PaymentMethod value)
        {
            var obj = await db.PaymentMethods.Find(t => t.Id == id).FirstOrDefaultAsync();
            if (obj == null)
            {
                return this.NotFound();
            }

            var query = Builders<PaymentMethod>.Filter.Eq(e => e.Id, id);
            await db.PaymentMethods.ReplaceOneAsync(query, value);
            return this.Ok(value);
        }

        // DELETE api/values/5
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            {
                var builder = Builders<Subscriber>.Filter;
                var filter = builder.Eq("PaymentMethod.Id", id);
                var result = await db.Subscribers.Find(filter).CountAsync();
                if (result > 0)
                {
                    return this.BadRequest(Resources.Error.PaymentMethodHasSubscribers);
                }
            }        
            
            await db.PaymentMethods.FindOneAndDeleteAsync(t => t.Id == id);
            return this.Ok();
        }
    }
}