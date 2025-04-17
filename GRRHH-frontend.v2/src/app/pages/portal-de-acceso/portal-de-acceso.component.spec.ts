import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDeAccesoComponent } from './portal-de-acceso.component';

describe('PortalDeAccesoComponent', () => {
  let component: PortalDeAccesoComponent;
  let fixture: ComponentFixture<PortalDeAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortalDeAccesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalDeAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
