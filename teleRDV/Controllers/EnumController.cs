using System;
using System.Collections.Generic;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    [RoutePrefix("api/enum")]
    public class EnumController : ApiController
    {
        [Route("address")]
        [HttpGet]
        public IHttpActionResult GetAddress()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(AddressType)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("info")]
        [HttpGet]
        public IHttpActionResult GetInfo()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(InfoType)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("phone")]
        [HttpGet]
        public IHttpActionResult GetPhone()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(PhoneType)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("weekdays")]
        [HttpGet]
        public IHttpActionResult GetWeekDays()
        {
            var enumVals = new List<object>();
            foreach (var item in Enum.GetValues(typeof(DayOfWeek)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }
    }
}