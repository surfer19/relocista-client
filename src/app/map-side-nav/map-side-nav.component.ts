import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map-side-nav',
  templateUrl: './map-side-nav.component.html',
  styleUrls: ['./map-side-nav.component.scss']
})
export class MapSideNavComponent implements OnInit {
  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }

}
