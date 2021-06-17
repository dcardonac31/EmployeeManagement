using BackendEmployee.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.Utilities
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginateDto paginateDto)
        {
            return queryable
                .Skip((paginateDto.Page - 1) * paginateDto.RecordsByPage)
                .Take(paginateDto.RecordsByPage);
        }
    }
}
