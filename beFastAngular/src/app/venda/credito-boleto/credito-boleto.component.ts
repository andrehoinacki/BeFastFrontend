import { Component, OnInit, ViewChild } from '@angular/core';
import { SimplePdfViewerComponent, SimplePDFBookmark } from 'simple-pdf-viewer';

@Component({
  selector: 'app-credito-boleto',
  templateUrl: './credito-boleto.component.html',
  styleUrls: ['./credito-boleto.component.css']
})
export class CreditoBoletoComponent implements OnInit {
  pdfSrc: string = 'C:/temp/MeuBoleto.pdf';
  constructor() { }

  ngOnInit() {
  }

  
}
