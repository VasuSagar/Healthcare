import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import *as jsPDF from 'jspdf'
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  public downloadpdf(){
    console.log("PDF WORKS");
    let doc=new jsPDF();

    let specialElementHandlers={
      '#editor':function(element,renderer){
        return true;
      }
    };

    let content=this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });

    doc.save('tst.pdf')

  }

}
