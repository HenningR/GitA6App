using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MySecureZoneApp.Api.Models
{
    public class UserModel
    {
        public string PartyID { get; set; }
        public string EmailAddress { get; set; }

        public string ClientName { get; set; }

        public bool isLoggedIn { get; set; }
        public string ResultMessage { get; set; }
        public string ResultAdvancedMessage { get; set; }
    }
}