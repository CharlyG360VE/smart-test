import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentFormComponent } from './aliment-form.component';

describe('AlimentFormComponent', () => {
  let component: AlimentFormComponent;
  let fixture: ComponentFixture<AlimentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
