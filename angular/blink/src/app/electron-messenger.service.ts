import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMessengerService {

  constructor(private _electronService: ElectronService) { }

  sendColor(color) {
    console.log('trying to send color', color, 'to Electron');
    if (this._electronService.isElectronApp) {
      console.log('is electron App');
      const message = {
        method: {
          name: 'setColor',
          params: [
            color
          ]
        },
      };
      console.log('sending method to Electron', message);
      const response = this._electronService.ipcRenderer.sendSync(message.toString());
      console.log('receiving response from Electron', response);
    } else {
      console.log('is NOT an electron App');
    }
  }
}
