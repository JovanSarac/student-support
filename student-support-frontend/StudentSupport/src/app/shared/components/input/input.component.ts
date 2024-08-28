import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'xp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() inputId = '';
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() placeholderSentence = '';
  @Input() inputType = '';
  fieldTextType: boolean = false;
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() min: string = '';
  @Input() wrongRedBorder: boolean = false;

  errorMessages: Record<string, string> = {
    required: 'Ovo polje je obavezno',
    email: 'Email nije unet u ispravnom formatu',
  };

  getErrorMessage(errorKey: string): string {
    return (
      this.customErrorMessages[errorKey] ||
      this.errorMessages[errorKey] ||
      'Invalid field'
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
