import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() label: string;
  @Input() hint: string;
  @Input() inputValue: string;
  @Input() suffix: string;
  constructor() { }

  ngOnInit(): void {
  }

}
