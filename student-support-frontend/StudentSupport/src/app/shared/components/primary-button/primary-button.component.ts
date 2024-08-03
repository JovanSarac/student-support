import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'xp-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css'],
})
export class PrimaryButtonComponent {
  @Input() textValue = '';
  @Input() buttonType = '';
  @Input() buttonId = '';
  @Input() imageSource = '';
  @Input() imageAlt = '';
  @Input() iconClass = '';
  @Output() OnClick = new EventEmitter();
  @Input() isDisabled = false;

  emitEvent(): void {
    this.OnClick.emit();
  }
}
