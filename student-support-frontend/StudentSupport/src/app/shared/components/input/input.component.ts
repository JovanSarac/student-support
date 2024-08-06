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

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'This e-mail is invalid',
  };

  getErrorMessage(errorKey: string): string {
    return this.customErrorMessages[errorKey] || this.errorMessages[errorKey] || 'Invalid field';
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
