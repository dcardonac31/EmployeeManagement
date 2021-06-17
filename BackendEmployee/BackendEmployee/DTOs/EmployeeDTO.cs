using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public int IdDocument { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime HiringDate { get; set; }
        public string Position { get; set; }
    }
}
