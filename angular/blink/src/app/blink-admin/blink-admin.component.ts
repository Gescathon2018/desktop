import { Component, OnInit } from '@angular/core';
import {ElectronMessengerService} from "../electron-messenger.service";

@Component({
  selector: 'app-blink-admin',
  templateUrl: './blink-admin.component.html',
  styleUrls: ['./blink-admin.component.css']
})
export class BlinkAdminComponent implements OnInit {

  public enabled: boolean;
  public color: string;

  constructor(private _electronMessenger: ElectronMessengerService) {
    this.enabled = true;
    this.color = '#ffffff';
  }

  ngOnInit() {
  }

  onColorPickerInput(color) {
    this.color = color;
    this.sendColor();
  }

  onToggleInput(checked) {
    this.enabled = checked;
    if (this.enabled) {
      this.sendColor();
    } else {
      this.turnOff();
    }
  }

  sendColor() {
    this._electronMessenger.sendColor(this.color);
  }

  turnOff() {
    this._electronMessenger.turnOff();
  }
}
