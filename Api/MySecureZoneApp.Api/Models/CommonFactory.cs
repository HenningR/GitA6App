using MySecureZoneApp.Api.Models.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MySecureZoneApp.Api.Models
{
    public class CommonFactory
    {
        private MySecureZone_Entities _dbContext = new MySecureZone_Entities();

        public CommonFactory()
        {
        }

        public string getHtmlPart(string htmlPartKey)
        {
            string resultHtml = "";

            List<int> siteTableLinkIds = new List<int>();

            var item = from htmlPart in _dbContext.HTMLParts
                       where htmlPart.HTMLPartKey.Contains(htmlPartKey)
                       select htmlPart;

            if (item != null && item.Count() > 0)
            {
                resultHtml =  item.First().HTML;
            }

            return resultHtml;
        }

    }
}