import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestricaoComponent } from './update-restricao.component';

describe('UsuarioComponent', () => {
  let component: UpdateRestricaoComponent;
  let fixture: ComponentFixture<UpdateRestricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRestricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRestricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
