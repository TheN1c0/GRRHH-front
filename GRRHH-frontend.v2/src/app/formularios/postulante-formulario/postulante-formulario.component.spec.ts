import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteFormularioComponent } from './postulante-formulario.component';

describe('PostulanteFormularioComponent', () => {
  let component: PostulanteFormularioComponent;
  let fixture: ComponentFixture<PostulanteFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostulanteFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
