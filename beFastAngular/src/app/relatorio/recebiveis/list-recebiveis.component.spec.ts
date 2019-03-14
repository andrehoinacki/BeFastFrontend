import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecebiveisComponent } from './list-recebiveis.component';

describe('ListVendasComponent', () => {
  let component: ListRecebiveisComponent;
  let fixture: ComponentFixture<ListRecebiveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRecebiveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecebiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
