using AutoMapper;
using BackendEmployee.DTOs;
using BackendEmployee.Entities;
using BackendEmployee.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.Controllers
{
    [Route("api/employee")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class EmployeesController : ControllerBase
    {
        private readonly ILogger<EmployeesController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public EmployeesController(
            ILogger<EmployeesController> logger,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeeCreateDto employeeCreateDto)
        {
            var employee = mapper.Map<Employee>(employeeCreateDto);
            context.Add(employee);
            await context.SaveChangesAsync();
            return NoContent();
        }



        [HttpGet]
        public async Task<ActionResult<List<EmployeeDTO>>> Get([FromQuery] PaginateDto paginateDto)
        {
            var queryable = context.Employees.AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(queryable);
            var employees = await queryable.OrderBy(x => x.Id).Paginate(paginateDto).ToListAsync();
            return mapper.Map<List<EmployeeDTO>>(employees);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<EmployeeDTO>> Get(int Id)
        {
            var employee = await context.Employees.FirstOrDefaultAsync(x => x.Id == Id);

            if (employee == null)
            {
                return NotFound();
            }

            return mapper.Map<EmployeeDTO>(employee);

        }

        [HttpPut("{Id:int}")]
        public async Task<ActionResult> Put(int Id,[FromBody] EmployeeCreateDto employeeCreateDto)
        {
            var employee = await context.Employees.FirstOrDefaultAsync(x => x.Id == Id);

            if(employee == null)
            {
                return NotFound();
            }

            employee = mapper.Map(employeeCreateDto, employee);

            await context.SaveChangesAsync();
            return NoContent();
        }



    }
}
