import * as blinkstick from 'blinkstick';
import * as usb from 'usb';

export class DeviceManager {

  public device;
  public serial;

  constructor(detachCallback, attachCallback) {
    this.deviceInit();
    usb.on('attach', usbDevice => {
      if (usbDevice.deviceDescriptor.iManufacturer === 1 && usbDevice.deviceDescriptor.idVendor === 8352) {
        this.deviceInit();
        setTimeout( () => { attachCallback(this.serial)}, 1000 );
      }
    });
    usb.on('detach', usbDevice => {
      if (usbDevice.deviceDescriptor.iManufacturer === 1 && usbDevice.deviceDescriptor.idVendor === 8352) {
        detachCallback(this.serial);
        this.serial = '';
      }
    });
  }

  deviceInit() {
    const device = blinkstick.findFirst();
    if (device) {
      this.device = device;
      this.device.setMode(3);
      this.device.getSerial((err, serial) => {
      this.serial = serial;
    });
    }
  }

  command(message: any) {
    this.device[message.method.name](...message.method.params);
  }

  getInfoBlock1(callback) {
    this.device.getInfoBlock1(function(err, data){
      callback(data)
    });
  }

  getInfoBlock2(callback) {
    this.device.getInfoBlock2(function(err, data){
      callback(data)
    });
  }

  setInfoBlock1(info, callback) {
    this.device.setInfoBlock1(info, (err) => { callback() })
  }

  setInfoBlock2(info, callback) {
    this.device.setInfoBlock1(info, (err) => { callback() })
  }
}