import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarVendaComponent } from './finalizar-venda.component';

describe('FinalizarVendaComponent', () => {
  let component: FinalizarVendaComponent;
  let fixture: ComponentFixture<FinalizarVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
