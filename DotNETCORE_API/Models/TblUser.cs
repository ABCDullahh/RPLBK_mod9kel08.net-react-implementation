using System;
using System.Collections.Generic;

namespace UserAPI.Models
{
    public partial class TblUser
    {
        public string Userid { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string homeAddress { get; set; }
        public string postalCode { get; set; }
        
    }
}
