import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css'
})
export class MessageModalComponent {
  @Input() modalTitle: string = '';
  @Input() modalContent: string = '';
  @Output() modalClosed = new EventEmitter<void>();
  @ViewChild('messageModal') msgModal!: ElementRef;

  show() {
    const modalElement = this.msgModal.nativeElement;
    const bootstrapModal = new Modal(modalElement);
    bootstrapModal.show();
  }

  close() {
    this.modalClosed.emit(); 
  }
}
