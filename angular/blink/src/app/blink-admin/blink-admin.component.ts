import { Component, OnInit } from '@angular/core';
import {ElectronMessengerService} from "../electron-messenger.service";

@Component({
  selector: 'app-blink-admin',
  templateUrl: './blink-admin.component.html',
  styleUrls: ['./blink-admin.component.css']
})
export class BlinkAdminComponent implements OnInit {

  constructor(private _electronMessenger: ElectronMessengerService) { }

  ngOnInit() {
  }

  onColorPickerInput(color) {
    console.log(color);
    this._electronMessenger.sendColor(color);
  }

}
