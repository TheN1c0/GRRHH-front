import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoAsignacionComponent } from './contrato-asignacion.component';

describe('ContratoAsignacionComponent', () => {
  let component: ContratoAsignacionComponent;
  let fixture: ComponentFixture<ContratoAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContratoAsignacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
