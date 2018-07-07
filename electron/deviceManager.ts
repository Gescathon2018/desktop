import * as blinkstick from 'blinkstick';
import * as usb from 'usb';

export class DeviceManager {

  device = blinkstick.findFirst();
  serial = '';

  constructor(detachCallback, attachCallback) {
    this.device.getSerial((err, serial) => {
      this.serial = serial;
    });
    usb.on('attach', usbDevice => {
      console.log('attach on device manager');
      if (usbDevice.deviceDescriptor.iManufacturer === 1 && usbDevice.deviceDescriptor.idVendor === 8352) {
        this.device = blinkstick.findFirst();
      }
      attachCallback(this.serial)
    });

    usb.on('detach', usbDevice => {
      console.log('detach on device manager');
      if (usbDevice.deviceDescriptor.iManufacturer === 1 && usbDevice.deviceDescriptor.idVendor === 8352) {
        detachCallback(this.serial)
      }
    });
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