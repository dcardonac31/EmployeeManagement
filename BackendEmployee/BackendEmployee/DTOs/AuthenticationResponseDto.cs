using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.DTOs
{
    public class AuthenticationResponseDto
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
