import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMessengerService {

  constructor(private _electronService: ElectronService) { }

  sendColor(color) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setColor', [color]);
      const response = this.sendToElectron(message);
    }
  }

  turnOff() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setColor', []);
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
}
