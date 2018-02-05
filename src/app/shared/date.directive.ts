import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input()
  private date: string;
  private paragraph; // <p>

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.paragraph = this.renderer.createElement('span');
  }

  @HostListener('mouseenter')
  mouseenter(eventDate: Event) {
    this.paragraph.innerHTML = this.date;
    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
  }
  @HostListener('mouseleave')
  mouseleave(eventDate: Event) {
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);

  }

}
