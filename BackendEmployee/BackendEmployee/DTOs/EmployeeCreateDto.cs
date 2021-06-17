using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.DTOs
{
    public class EmployeeCreateDto
    {
        public int IdDocument { get; set; }
        [Required(ErrorMessage = "The Name field is required)")]
        public string Name { get; set; }
        [Required(ErrorMessage = "The LastName field is required)")]
        public string LastName { get; set; }
        public DateTime HiringDate { get; set; }
        [Required(ErrorMessage = "The Position field is required)")]
        public string Position { get; set; }
    }
}
