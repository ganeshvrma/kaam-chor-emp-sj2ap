// import { CommonModule } from '@angular/common';
// import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
// import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';

// @Component({
//   selector: 'app-otp-input',
//   standalone:true,
//   templateUrl: './otp-input.component.html',
//   styleUrls: ['./otp-input.component.scss'],
//    imports: [CommonModule, IonicModule,ReactiveFormsModule,FormsModule] ,

//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => OtpInputComponent),
//       multi: true
//     }
//   ], 

// })
// export class OtpInputComponent implements OnInit, ControlValueAccessor {
//   @Output() otpChange = new EventEmitter<string>();

//   constructor() { }

//   ngOnInit() {}

//   onOtpChange(event: any, index: number) {
//     const input = event.target as HTMLIonInputElement;
//     const value = input.value as string;
   
//     if (value.length === 1) {
//       if (index < 3) {
//         const nextInput = document.getElementById('otp-' + (index + 1)) as HTMLIonInputElement;
//         if (nextInput) {
//           nextInput.setFocus();
//         }
//       } else {
//         input.getInputElement().then(native => native.blur());
//       }
//     }
//     this.emitOtpValue();
//   }

//   onKeyDown(event: KeyboardEvent, index: number) {
//     if (event.key === 'Backspace' && index > 0 && (event.target as HTMLInputElement).value === '') {
//       const prevInput = document.getElementById('otp-' + (index - 1)) as HTMLInputElement;
//       if (prevInput) {
//         prevInput.focus();
//       }
//     }
//     this.emitOtpValue();
//   }

//   getOtpValue(): string {
//     return Array.from({ length: 4 }, (_, i) =>
//       (document.getElementById('otp-' + i) as HTMLInputElement).value
//     ).join('');
//   }

//   emitOtpValue() {
//     const otp = this.getOtpValue();
//     this.otpChange.emit(otp);
//     this.onChange(otp);
//     this.onTouch();
//   }

//   // ControlValueAccessor methods
//   onChange: any = () => {};
//   onTouch: any = () => {};

//   writeValue(value: string): void {
//     if (value) {
//       const otpArray = value.split('');
//       otpArray.forEach((digit, index) => {
//         const input = document.getElementById('otp-' + index) as HTMLInputElement;
//         if (input) {
//           input.value = digit;
//         }
//       });
//     }
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouch = fn;
//   }

//   setDisabledState?(isDisabled: boolean): void {
//     // Implement if needed
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-otp-input',
  standalone:true,
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  imports: [CommonModule, IonicModule,FormsModule] ,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    }
  ]
})
export class OtpInputComponent implements OnInit, ControlValueAccessor {
  @Output() otpChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onOtpChange(event: any, index: number) {
    const input = event.target as HTMLIonInputElement;
    const value = input.value as string;
   
    if (value.length === 1) {
      if (index < 3) {
        const nextInput = document.getElementById('otp-' + (index + 1)) as HTMLIonInputElement;
        if (nextInput) {
          nextInput.setFocus();
        }
      } else {
        input.getInputElement().then(native => native.blur());
      }
    }
    this.emitOtpValue();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0 && (event.target as HTMLInputElement).value === '') {
      const prevInput = document.getElementById('otp-' + (index - 1)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
    this.emitOtpValue();
  }

  getOtpValue(): string {
    return Array.from({ length: 4 }, (_, i) =>
      (document.getElementById('otp-' + i) as HTMLInputElement).value
    ).join('');
  }

  emitOtpValue() {
    const otp = this.getOtpValue();
    this.otpChange.emit(otp);
    this.onChange(otp);
    this.onTouch();
  }

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    if (value) {
      const otpArray = value.split('');
      otpArray.forEach((digit, index) => {
        const input = document.getElementById('otp-' + index) as HTMLInputElement;
        if (input) {
          input.value = digit;
        }
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }
}