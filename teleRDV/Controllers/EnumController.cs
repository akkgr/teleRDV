using System;
using System.Collections.Generic;
using System.Web.Http;
using teleRDV.Models;

namespace teleRDV.Controllers
{
    [RoutePrefix("api/enum")]
    public class EnumController : ApiController
    {
        [Route("AddressType")]
        [HttpGet]
        public IHttpActionResult GetAddressType()
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

        [Route("AppointmentStatus")]
        [HttpGet]
        public IHttpActionResult GetAppointmentStatus()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(AppointmentStatus)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("CallReason")]
        [HttpGet]
        public IHttpActionResult GetCallReason()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(CallReason)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("CallStatus")]
        [HttpGet]
        public IHttpActionResult GetCallStatus()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(CallStatus)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("CallType")]
        [HttpGet]
        public IHttpActionResult GetCallType()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(CallType)))
            {
                enumVals.Add(new
                {
                    key = (int)item,
                    value = item.ToString()
                });
            }

            return Ok(enumVals);
        }

        [Route("InfoType")]
        [HttpGet]
        public IHttpActionResult GetInfoType()
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

        [Route("PhoneType")]
        [HttpGet]
        public IHttpActionResult GetPhoneType()
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

        [Route("DayOfWeek")]
        [HttpGet]
        public IHttpActionResult GetDayOfWeek()
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