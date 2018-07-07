import { TestBed, inject } from '@angular/core/testing';

import { ElectronMessengerService } from './electron-messenger.service';

describe('ElectronMessengerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronMessengerService]
    });
  });

  it('should be created', inject([ElectronMessengerService], (service: ElectronMessengerService) => {
    expect(service).toBeTruthy();
  }));
});
