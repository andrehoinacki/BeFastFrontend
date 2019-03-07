import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSadoComponent } from './consulta-saldo.component';

describe('CreditoComponent', () => {
  let component: ConsultaSadoComponent;
  let fixture: ComponentFixture<ConsultaSadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaSadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
