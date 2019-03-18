import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetornoBancoComponent } from './retorno-banco.component';

describe('RetornoBancoComponent', () => {
  let component: RetornoBancoComponent;
  let fixture: ComponentFixture<RetornoBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetornoBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetornoBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
