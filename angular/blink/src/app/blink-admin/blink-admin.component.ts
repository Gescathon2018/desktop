import {Component, NgZone, OnInit} from '@angular/core';
import {ElectronMessengerService} from '../electron-messenger.service';

@Component({
  selector: 'app-blink-admin',
  templateUrl: './blink-admin.component.html',
  styleUrls: ['./blink-admin.component.css'],
})
export class BlinkAdminComponent implements OnInit {

  public enabled: boolean = true ;
  public attached: boolean = false ;
  public color: string = '#00f900';

  public pulseButton = false;
  public blinkButton = false;
  public danceButton = false;
  public morphButton = false;
  public spinnerButton = false;

  constructor(
    private _electronMessenger: ElectronMessengerService,
    private zone: NgZone) {
    this.enabled = true;
  }

  ngOnInit() {
    this.loadInfoBlocks();
    this.loadListeners();
    this._electronMessenger.isConnected();
  }

  loadInfoBlocks() {
    // to do
  }

  loadListeners() {
    this._electronMessenger.attachEvent.subscribe( event => {
      this.zone.run(() => {
        console.log('event here!', event);
        this.attached = event;
        if (this.attached) {
          this.sendColor();
        }
      });
    });
    this._electronMessenger.loadListeners();
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

  sendColor(color?) {
    this.enabled = this.attached ? true : this.enabled;
    this._electronMessenger.sendColor(color ? color : this.color);
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

  dance() {
    this._electronMessenger.dance(this.color);
  }

  morph() {
    this._electronMessenger.morph(this.color);
  }

  spinner() {
    this._electronMessenger.spinner(this.color);
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
