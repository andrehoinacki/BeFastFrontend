import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVendasComponent } from './list-vendas.component';

describe('ListVendasComponent', () => {
  let component: ListVendasComponent;
  let fixture: ComponentFixture<ListVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
