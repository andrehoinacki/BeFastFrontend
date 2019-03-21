import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCreditoComponent } from './historico-credito.component';

describe('ConsumoComponent', () => {
  let component: HistoricoCreditoComponent;
  let fixture: ComponentFixture<HistoricoCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
