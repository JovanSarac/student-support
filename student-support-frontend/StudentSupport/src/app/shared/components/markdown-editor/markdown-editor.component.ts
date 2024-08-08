import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'cc-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.css'
})
export class MarkdownEditorComponent implements OnChanges, AfterViewInit {
  @Input() label = "";
  @Input() text = "";
  @Input() sidePreview = false;
  synchEnabled = false;
  @Input() submitCtrls = false;
  @Input() indextab = 50;
  @Output() submit = new EventEmitter<string>();
  @Output() textChanged = new EventEmitter<string>();

  @Input() livePreview = true;
  selection: any;
  @ViewChild('textAreaElement') textArea: ElementRef<HTMLTextAreaElement> | undefined;
  @ViewChild('markdownContainerElement') markdownContainer: ElementRef<HTMLElement> | undefined;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if(this.textArea) {
      this.textArea.nativeElement.focus();
      this.changeDetector.detectChanges();
    }
    this.synchEnabled = this.sidePreview;
  }

  ngAfterViewInit() {
    this.setupScrollSync();
  }

  setupScrollSync() {
    if(!this.sidePreview || !this.livePreview) return;
    setTimeout(() => { // Timeout is needed for ngIf in case the user turns off livePreview and reactivates it.
      const textArea = this.textArea!.nativeElement;
      const markdownContainer = this.markdownContainer!.nativeElement;
  
      const syncScroll = (source: HTMLElement, target: HTMLElement) => {
        const sourceRatio = source.scrollTop / (source.scrollHeight - source.clientHeight);
        const targetScrollTop = sourceRatio * (target.scrollHeight - target.clientHeight);
  
        if (Math.abs(target.scrollTop - targetScrollTop) > 1) {
          target.scrollTop = targetScrollTop;
        }
      };
  
      let isSyncing = false;
  
      const handleScroll = (source: HTMLElement, target: HTMLElement) => {
        if (isSyncing || !this.synchEnabled) return;
        isSyncing = true;
  
        syncScroll(source, target);
  
        setTimeout(() => {
          isSyncing = false;
        }, 50);  // Slight delay to prevent rapid firing
      };
  
      textArea.addEventListener('scroll', () => handleScroll(textArea, markdownContainer));
      markdownContainer.addEventListener('scroll', () => handleScroll(markdownContainer, textArea));
    }, 100);
  }

  insertElement(type: string): void {
    let tagBegin = '';
    let tagEnd = '';
    let tagText = '';
    switch (type) {
      case 'bold':
        tagBegin = tagEnd = '**';
        tagText = 'Bold Text';
        break;
      case 'italic':
        tagBegin = tagEnd = '_';
        tagText = 'Italic Text';
        break;
      case 'bulleted':
        tagBegin = '- ';
        tagText = 'List Item';
        break;
      case 'numbered':
        tagBegin = '1. ';
        tagText = 'List Item';
        break;
      case 'code':
        tagBegin = tagEnd = '```';
        tagText = 'Code';
        break;
      case 'link':
          tagBegin = '<a href="';
          tagEnd= '" target="_blank">Text</a>'
          tagText = 'Url';
          break;
      case 'h1':
        tagBegin = '# ';
        tagText = 'Heading 1';
        break;
      case 'h2':
        tagBegin = '## ';
        tagText = 'Heading 2';
        break;
      case 'h3':
        tagBegin = '### ';
        tagText = 'Heading 3';
        break;
    }
    if (this.selection) {
      if (this.selection.selectionStart !== this.selection.selectionEnd) {
        tagText = this.text.slice(
          this.selection.selectionStart,
          this.selection.selectionEnd
        );
      }
    }
    const text = tagBegin + tagText + tagEnd;

    let selectionStart: number;
    if (this.selection) {
      this.text =
        this.text.slice(0, this.selection.selectionStart) +
        text +
        this.text.slice(this.selection.selectionEnd);
      selectionStart = this.selection.selectionStart + tagBegin.length;
    } else {
      selectionStart = this.text.length + tagBegin.length;
      this.text += text;
    }

    // TODO: Usage of setTimeout() should be avoided. Find a better solution.
    setTimeout(() => {
      this.textArea!.nativeElement.focus();
      this.textArea!.nativeElement.setSelectionRange(
        selectionStart,
        selectionStart + tagText.length
      );
    });
  }

  onSelect(event: Event): void {
    this.selection = event.target;
  }

  onClick(event: Event): void {
    this.selection = event.target;
  }

  onChange(): void {
    this.textChanged.emit(this.text);
  }

  onSubmit(isDiscard: boolean): void {
    if(isDiscard) this.submit.emit();
    else this.submit.emit(this.text);
  }

}
