import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors-show',
  templateUrl: './errors-show.component.html',
  styleUrls: ['./errors-show.component.css']
})
export class ErrorsShowComponent implements OnInit {

  @Input()
  errors: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
