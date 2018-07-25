using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MySecureZoneApp.Api.Models
{
    public class DocumentByteModel
    {
        public string DocumentName { get; set; }
        public byte[] DocumentData { get; set; }

        public bool Result { get; set; }

        public string ResultDescription { get; set; }
    }
}