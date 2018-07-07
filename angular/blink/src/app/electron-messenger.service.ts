import {EventEmitter, Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronMessengerService {

  private NUM_LEDS = 8;

  public attachEvent = new EventEmitter<boolean>();

  constructor(private _electronService: ElectronService) {
  }

  setNumLeds(num, color) {
    this.NUM_LEDS = num;
    this.sendColor(color);
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
      const rgbColor = this.hexToRgb(color);
      // for (let i = 0; i < this.NUM_LEDS; i++) {
      //   const params = [rgbColor.r, rgbColor.g, rgbColor.b, {index: i}];
      //   const message = this.makeMessage('setColor', params);
      // }
      let colors = [];
      for (let i = 0; i < this.NUM_LEDS; i++) {
        colors = [...colors, rgbColor.g, rgbColor.r, rgbColor.b]
      }
      console.log(colors)
      const message = this.makeMessage('setColors', [0, colors]);
      const response = this.sendToElectron(message);
    }
  }

  turnOff() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('turnOff', []);
      const response = this.sendToElectron(message);
    }
  }

  blink(color) {
    if (this._electronService.isElectronApp) {
      const rgbColor = this.hexToRgb(color);
      for (let i = 0; i < this.NUM_LEDS; i++) {
        const params = [rgbColor.r, rgbColor.g, rgbColor.b, {index: i}];
        const message = this.makeMessage('blink', params);
        const response = this.sendToElectron(message);
      }
    }
  }

  pulse(color) {
    if (this._electronService.isElectronApp) {
      const rgbColor = this.hexToRgb(color);
      for (let i = 0; i < this.NUM_LEDS; i++) {
        const params = [rgbColor.r, rgbColor.g, rgbColor.b, {index: i}];
        const message = this.makeMessage('pulse', params);
        const response = this.sendToElectron(message);
      }
    }
  }

  morph(color) {
    if (this._electronService.isElectronApp) {
      const rgbColor = this.hexToRgb(color);
      for (let i = 0; i < this.NUM_LEDS; i++) {
        const params = [rgbColor.r, rgbColor.g, rgbColor.b, {index: i}];
        const message = this.makeMessage('morph', params);
        const response = this.sendToElectron(message);
      }
    }
  }

  sendRandomColor() {
    if (this._electronService.isElectronApp) {
      const message = this.makeMessage('setRandomColor', []);
      const response = this.sendToElectron(message);
    }
  }

  startMadness() {
    if (this._electronService.isElectronApp) {
      for (let i = 0; i < this.NUM_LEDS; i++) {
        const randomColor = this.randomColorRGB();
        console.log(randomColor);
        const params = [randomColor.r, randomColor.g, randomColor.b, {index: i}];
        const message = this.makeMessage('setColor', params);
        const response = this.sendToElectron(message);
      }
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
