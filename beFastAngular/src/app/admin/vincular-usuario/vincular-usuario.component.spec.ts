import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularUsuarioComponent } from './vincular-usuario.component';

describe('VincularUsuarioComponent', () => {
  let component: VincularUsuarioComponent;
  let fixture: ComponentFixture<VincularUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
