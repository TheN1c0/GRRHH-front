import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteListadoComponent } from './postulante-listado.component';

describe('PostulanteListadoComponent', () => {
  let component: PostulanteListadoComponent;
  let fixture: ComponentFixture<PostulanteListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostulanteListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
