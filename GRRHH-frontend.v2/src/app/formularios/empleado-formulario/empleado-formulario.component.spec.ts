import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFormularioComponent } from './empleado-formulario.component';

describe('EmpleadoFormularioComponent', () => {
  let component: EmpleadoFormularioComponent;
  let fixture: ComponentFixture<EmpleadoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
