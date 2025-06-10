import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarHorarioComponent } from './modal-asignar-horario.component';

describe('ModalAsignarHorarioComponent', () => {
  let component: ModalAsignarHorarioComponent;
  let fixture: ComponentFixture<ModalAsignarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAsignarHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsignarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
