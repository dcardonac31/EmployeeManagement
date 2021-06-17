using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendEmployee.DTOs
{
    public class PaginateDto
    {
        public int Page { get; set; } = 1;

        private int recordsByPage = 10;

        private readonly int maxCantRecordsByPage = 50;

        public int RecordsByPage
        {
            get
            {
                return recordsByPage;
            }
            set
            {
                recordsByPage = (value > maxCantRecordsByPage) ? maxCantRecordsByPage : value;
            }
        }
    }
}
