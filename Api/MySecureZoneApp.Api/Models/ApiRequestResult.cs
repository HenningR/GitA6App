using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MySecureZoneApp.Api.Models
{
    public class ApiRequestResult
    {
        public bool Result { get; set; }
        public string ResultDescription1 { get; set; }
        public string ResultDescription2 { get; set; }
        public string ResultDescription3 { get; set; }
    }
}