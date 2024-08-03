import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'xp-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.css'],
})
export class SecondaryButtonComponent {
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
