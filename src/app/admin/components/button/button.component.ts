import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() class: string | string[];
  @Input() disabled: boolean;
  @Output() customClick: EventEmitter<null> = new EventEmitter(null);
  constructor() { }

  ngOnInit() {
  }
  clickEmit(){
    if(this.disabled) return;
    this.customClick.emit()
  }
}
