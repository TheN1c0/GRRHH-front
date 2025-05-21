import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteContratarComponent } from './postulante-contratar.component';

describe('PostulanteContratarComponent', () => {
  let component: PostulanteContratarComponent;
  let fixture: ComponentFixture<PostulanteContratarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostulanteContratarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulanteContratarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
