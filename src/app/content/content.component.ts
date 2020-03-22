import {Component, Input, OnInit} from '@angular/core';
import {ReposInterface} from "../repos.interface";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() data: ReposInterface[];
  constructor() {}

  ngOnInit(): void {
  }

}
