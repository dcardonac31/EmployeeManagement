import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { EmployeeDTO } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }


  employeesList: EmployeeDTO[] =  [];
  dataSource = new MatTableDataSource(this.employeesList);

  displayedColumns = ['id', 'idDocument', 'name', 'lastName', 'hiringDate', 'position', 'actions'];
  cantTotalRecords;
  cantRecordsToShow = 10;
  currentPage = 1;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, {header:['id', 'idDocument', 'name', 'lastName', 'hiringDate', 'position']});
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'EmployeesReport.xlsx');
}

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.cantRecordsToShow);
  }

  loadRecords(page: number, cantRecordsToShow){
    this.employeeService.getAll(page, cantRecordsToShow)
    .subscribe((response: HttpResponse<EmployeeDTO[]>) => {
      this.employeesList = response.body;
      this.cantTotalRecords = response.headers.get("cantTotalRecords");
      this.dataSource = new MatTableDataSource(this.employeesList);
    }, error => console.error(error));
  }

  paginationRefresh(data: PageEvent){
    this.currentPage = data.pageIndex + 1;
    this.cantRecordsToShow = data.pageSize;
    this.loadRecords(this.currentPage, this.cantRecordsToShow);
  }
  





}
