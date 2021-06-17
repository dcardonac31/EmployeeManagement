using AutoMapper;
using BackendEmployee.DTOs;
using BackendEmployee.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.Utilities
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<EmployeeCreateDto, Employee>();
        }
    }
}
