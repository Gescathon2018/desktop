import {Component, NgZone, OnInit} from '@angular/core';
import {ElectronMessengerService} from '../electron-messenger.service';

@Component({
  selector: 'app-blink-admin',
  templateUrl: './blink-admin.component.html',
  styleUrls: ['./blink-admin.component.css']
})
export class BlinkAdminComponent implements OnInit {

  public enabled: boolean = true ;
  public attached: boolean = true ;
  public color: string = '#ffffff';

  constructor(private _electronMessenger: ElectronMessengerService, private zone: NgZone) {
    this.enabled = true;
    this.color = '#ffffff';
  }

  ngOnInit() {
    this.loadInfoBlocks();
    this.loadListeners();
  }

  loadInfoBlocks() {
    // to do
  }

  loadListeners() {
    this._electronMessenger.attachEvent.subscribe( event => {
      this.zone.run(() => {
        console.log('event here!', event);
        this.attached = event;
      });
    });
    this._electronMessenger.loadListeners();
  }

  onRangeInput(event) {
    console.log(event);
  }

  onColorPickerInput(color) {
    this.color = color;
    this.sendColor();
  }

  onDestinationColorPickerInput(color) {
    this.morph(color);
  }

  onToggleClick(event) {
    this.enabled = event.target.checked;
    if (this.enabled) {
      console.log('enabled');
      this.sendColor();
    } else {
      console.log('turnOff');
      this.turnOff();
    }
  }

  sendColor() {
    this._electronMessenger.sendColor(this.color);
  }

  turnOff() {
    this._electronMessenger.turnOff();
  }

  blink() {
    this._electronMessenger.blink(this.color);
  }

  pulse() {
    this._electronMessenger.pulse(this.color);
  }

  morph(color) {
    this._electronMessenger.morph(color);
  }

  getInfoBlock1() {
    this._electronMessenger.getInfoBlock1();
  }

  getInfoBlock2() {
    this._electronMessenger.getInfoBlock2();
  }

  setInfoBlock1() {
    this._electronMessenger.setInfoBlock1('Pippo');
  }

  setInfoBlock2() {
    this._electronMessenger.setInfoBlock2('Pluto');
  }
}
