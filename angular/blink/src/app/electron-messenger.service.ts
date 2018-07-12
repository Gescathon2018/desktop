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
    this._electronService.ipcRenderer.on('getInfoBlock1', (event, data) => {
      console.log(typeof data);
      this.attachEvent.emit(data);
    });
    this._electronService.ipcRenderer.on('getInfoBlock2', (event, data) => {
      this.attachEvent.emit(data);
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
      this.sendToElectron(message);
    }
  }

  turnOff() {
    if (this._electronService.isElectronApp) {
      clearInterval(this.blinkInterval);
      this.blinkInterval = '';
      clearInterval(this.pulseInterval);
      this.pulseInterval = '';
      clearInterval(this.danceInterval);
      this.danceInterval = '';
      clearInterval(this.morphInterval);
      this.morphInterval = '';
      clearInterval(this.spinnerInterval);
      this.spinnerInterval = '';
      let message = this.makeMessage('turnOff', []);
      this.sendToElectron(message);
      message = this.makeMessage('setColor', ['#000000']);
      this.sendToElectron(message);
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
          this.sendToElectron(message);
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
        this.sendToElectron(message);
        this.pulseInterval = setInterval( () => {
          const message = this.makeMessage('pulse', [color]);
          this.sendToElectron(message);
        }, 2500 );
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
          this.sendToElectron(message);
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
          this.sendToElectron(message);
        }, 150 );
      }
    }
  }

  spinner(color) {
    if (this._electronService.isElectronApp) {
      if (this.spinnerInterval) {
        clearInterval(this.spinnerInterval);
        this.spinnerInterval = '';
        setTimeout(() => {this.sendColor(color)}, 1000);
      } else {
        this.sendColor('#000000');
        let i = 0;
        this.spinnerInterval = setInterval( () => {
          const message = this.makeMessage(
            'blink',
            [color, {index: i.toString(), delay: 250}]);
          this.sendToElectron(message);
          i = (i + 1) % 8;

        }, 100 );
      }
    }
  }

  sendRandomColor() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setRandomColor', []);
      this.sendToElectron(message);
    }
  }

  getInfoBlock1() {
    if (this._electronService.isElectronApp) {
      console.log('service getInfoBlock1');
      const message = this.makeMessage('getInfoBlock1', []);
      this.sendToElectron(message);
    }
  }

  getInfoBlock2() {
    if (this._electronService.isElectronApp) {
      console.log('service getInfoBlock2');
      const message = this.makeMessage('getInfoBlock2', []);
      this.sendToElectron(message);
    }
  }

  setInfoBlock1(info) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setInfoBlock1', [info]);
      this.sendToElectron(message);
    }
  }

  setInfoBlock2(info) {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setInfoBlock2', [info]);
      this.sendToElectron(message);
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
