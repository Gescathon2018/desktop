import {EventEmitter, Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMessengerService {

  public attachEvent = new EventEmitter<boolean>();
  public blinkInterval;
  public pulseInterval;
  public danceInterval;
  public morphInterval;
  public spinnerInterval;

  constructor(private _electronService: ElectronService) {
  }

  loadListeners() {
    this._electronService.ipcRenderer.on('attach', () => {
      this.attachEvent.emit(true);
    });
    this._electronService.ipcRenderer.on('detach', () => {
      this.attachEvent.emit(false);
    });
  }

  isConnected() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('connected', {});
    }
  }

  sendColor(color) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setColor', [color]);
      const response = this.sendToElectron(message);
    }
  }

  turnOff() {
    if (this._electronService.isElectronApp) {
      let message = this.makeMessage('turnOff', []);
      let response = this.sendToElectron(message);
      message = this.makeMessage('setColor', ['#000000']);
      response = this.sendToElectron(message);
    }
  }

  blink(color) {
    if (this._electronService.isElectronApp) {
      if (this.blinkInterval) {
        clearInterval(this.blinkInterval);
        this.blinkInterval = '';
        setTimeout(() => {this.sendColor(color)}, 500);
      } else {
        this.blinkInterval = setInterval( () => {
          const message = this.makeMessage('blink', [color]);
          const response = this.sendToElectron(message);
        }, 1000 );
      }
    }
  }

  pulse(color) {
    if (this._electronService.isElectronApp) {
      if (this.pulseInterval) {
        clearInterval(this.pulseInterval);
        this.pulseInterval = '';
        setTimeout(() => {this.sendColor(color)}, 1000);
      } else {
        const message = this.makeMessage('pulse', [color]);
        const response = this.sendToElectron(message);
        this.pulseInterval = setInterval( () => {
          const message = this.makeMessage('pulse', [color]);
          const response = this.sendToElectron(message);
        }, 3000 );
      }
    }
  }

  morph(color) {
    if (this._electronService.isElectronApp) {
      if (this.morphInterval) {
        clearInterval(this.morphInterval);
        this.morphInterval = '';
        setTimeout(() => {this.sendColor(color)}, 1000);
      } else {
        this.morphInterval = setInterval( () => {
          const message = this.makeMessage(
            'morph',
            ['random', {duration: 400}]);
          const response = this.sendToElectron(message);
        }, 600 );
      }
    }
  }

  dance(color) {
    if (this._electronService.isElectronApp) {
      if (this.danceInterval) {
        clearInterval(this.danceInterval);
        this.danceInterval = '';
        setTimeout(() => {this.sendColor(color)}, 1000);
      } else {
        this.danceInterval = setInterval( () => {
          const message = this.makeMessage(
            'blink',
            ['random', {delay: 100}]);
          const response = this.sendToElectron(message);
        }, 150 );
      }
    }
  }

  spinner(color) {
    if (this._electronService.isElectronApp) {
      if (this.spinnerInterval) {
        clearInterval(this.spinnerInterval);
        this.spinnerInterval = '';
        // setTimeout(() => {this.setMode(3)}, 1000);
        setTimeout(() => {this.sendColor(color)}, 1000);
      } else {
        this.sendColor('#000000');
        // this.setMode(0);
        let i = 0;
        this.spinnerInterval = setInterval( () => {
          const message = this.makeMessage(
            'pulse',
            [color, {index: i.toString(), duration: 200}]);
          const response = this.sendToElectron(message);
          i = (i + 1) % 8;

        }, 220 );
      }
    }
  }

  setMode(mode) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setMode', [mode]);
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

  private  getRandomColorHEX() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private randomColorComponent() {
    return Math.floor(Math.random() * 255);
  }

}
