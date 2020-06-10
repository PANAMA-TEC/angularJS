import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

	path:String = Path.url;
  	constructor() { }

  	ngOnInit(): void {
  	}

}
