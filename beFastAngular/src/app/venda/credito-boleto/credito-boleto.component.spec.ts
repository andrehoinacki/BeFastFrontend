import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoBoletoComponent } from './credito-boleto.component';

describe('CreditoBoletoComponent', () => {
  let component: CreditoBoletoComponent;
  let fixture: ComponentFixture<CreditoBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditoBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
