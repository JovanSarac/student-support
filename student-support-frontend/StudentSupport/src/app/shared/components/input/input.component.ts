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

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'This e-mail is invalid',
  };

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
