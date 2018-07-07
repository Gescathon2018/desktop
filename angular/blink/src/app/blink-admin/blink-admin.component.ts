import {Component, NgZone, OnInit} from '@angular/core';
import {ElectronMessengerService} from '../electron-messenger.service';

@Component({
  selector: 'app-blink-admin',
  templateUrl: './blink-admin.component.html',
  styleUrls: ['./blink-admin.component.css']
})
export class BlinkAdminComponent implements OnInit {

  public enabled: boolean;
  // public attached: boolean;
  public attached = true ;
  public color: string;

  constructor(private _electronMessenger: ElectronMessengerService, private zone: NgZone) {
    this.enabled = true;
    // this.attached = true;
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
        // this.attached = event;
        this.attached = event;
      });
    });
    this._electronMessenger.loadListeners();
  }

  onRangeInput(event) {
    console.log(event);
    this._electronMessenger.setNumLeds(event.target.value, this.color);
  }

  onColorPickerInput(color) {
    this.color = color;
    this.sendColor();
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

  madness() {
    this._electronMessenger.startMadness();
  }

  setInfoBlock1() {
    this._electronMessenger.setInfoBlock1('asdf');
  }

  setInfoBlock2() {
    this._electronMessenger.setInfoBlock2('asdf');
  }
}
