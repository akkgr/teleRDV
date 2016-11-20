using teleRDV.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace teleRDV.Controllers
{
    public class BaseController : ApiController
    {
        internal readonly Context db;

        public BaseController(Context ctx)
        {
            this.db = ctx;
        }
    }
}
