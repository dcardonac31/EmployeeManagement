using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.Utilities
{
    public static class HttpContextExtensions
    {
        public async static Task InsertPaginationParametersInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if(httpContext == null) { throw new ArgumentException(nameof(httpContext)); }

            double cant = await queryable.CountAsync();
            httpContext.Response.Headers.Add("cantTotalRecords", cant.ToString());
        }
    }
}
