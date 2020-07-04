import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent implements OnInit {
  background: string;
  propertyTypeList: string[] = ['1+kk', '1+1', '2+kk', '2+1', '3+kk', '3+1', '4+kk', '4+1', '5+kk', '5+1', '6+', 'Other'];
  properties = new FormControl();
  selectedPropertyType = 0;
  constructor() {
    this.background = this.background ? '#2c2c54' : 'primary';
  }

  onPropertyTypeChange(event) {
    console.log('event', event);
    this.selectedPropertyType = event;
  }

  ngOnInit(): void {
  }

}
