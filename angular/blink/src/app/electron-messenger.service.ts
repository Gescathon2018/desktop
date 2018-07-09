import {EventEmitter, Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMessengerService {

  public attachEvent = new EventEmitter<boolean>();

  constructor(private _electronService: ElectronService) {
  }

  loadListeners() {
    this._electronService.ipcRenderer.on('attach', () => {
      console.log('emit true');
      this.attachEvent.emit(true);
    });
    this._electronService.ipcRenderer.on('detach', () => {
      console.log('emit false');
      this.attachEvent.emit(false);
    });
  }

  sendColor(color) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setColor', [color]);
      const response = this.sendToElectron(message);
    }
  }

  turnOff() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setColor', ['#000000']);
      const response = this.sendToElectron(message);
    }
  }

  blink(color) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('blink', [color]);
      const response = this.sendToElectron(message);
    }
  }

  pulse(color) {
    if (this._electronService.isElectronApp) {
        const message = this.makeMessage('pulse', [color]);
        const response = this.sendToElectron(message);
    }
  }

  morph(color) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('morph', [color]);
      const response = this.sendToElectron(message);
    }
  }

  sendRandomColor() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setRandomColor', []);
      const response = this.sendToElectron(message);
    }
  }

  getInfoBlock1() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('getInfoBlock1', []);
      const response = this.sendToElectron(message);
    }
  }

  getInfoBlock2() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('getInfoBlock2', []);
      const response = this.sendToElectron(message);
    }
  }

  setInfoBlock1(info) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setInfoBlock1', [info]);
      const response = this.sendToElectron(message);
    }
  }

  setInfoBlock2(info) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setInfoBlock2', [info]);
      const response = this.sendToElectron(message);
    }
  }

  private makeMessage(methodName, params) {
    return {
      method: {
        name: methodName,
        params: params,
      }
    };
  }

  private sendToElectron(message) {
    return this._electronService.ipcRenderer.send('blinkmystick', message);
  }

  private hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private randomColorRGB() {
    return {
      r: this.randomColorComponent(),
      g: this.randomColorComponent(),
      b: this.randomColorComponent(),
    };
  }

  private randomColorComponent() {
    return Math.floor(Math.random() * 255);
  }

}
