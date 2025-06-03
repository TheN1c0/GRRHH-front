import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposHorarioComponent } from './grupos-horario.component';

describe('GruposHorarioComponent', () => {
  let component: GruposHorarioComponent;
  let fixture: ComponentFixture<GruposHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GruposHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
