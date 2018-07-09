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

  circleEffect(device: any, color: string, repetitions: number) {
    console.log(device);
    for (let i = 0; i < 8*repetitions; i++) {
      setTimeout(() => {
        if (device) {
          device.pulse(color, {duration: 250, index: i % 8});
        }
      }, 500);
    }
  }

  command(message: any) {
    this.device[message.method.name](...message.method.params);
  }
}