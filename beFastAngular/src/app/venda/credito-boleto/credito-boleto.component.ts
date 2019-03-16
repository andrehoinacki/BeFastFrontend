import { Component, OnInit, ViewChild } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-credito-boleto',
  templateUrl: './credito-boleto.component.html',
  styleUrls: ['./credito-boleto.component.css']
})
export class CreditoBoletoComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit() {
    
  }

  downloadPdf() {
    // const doc = new jsPDF();
    //doc.existsFileInVFS("MeuBoleto.pdf");
    // doc.text('Alguma coisa', 10,10);
    // doc.save("Teste.pdf");
  }
  
}
