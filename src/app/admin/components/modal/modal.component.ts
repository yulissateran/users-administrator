import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Output() close: EventEmitter<null> = new EventEmitter(null);
  constructor() {}

  ngOnInit() {}
}
