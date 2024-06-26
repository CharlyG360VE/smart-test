import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentsListComponent } from './aliments-list.component';

describe('AlimentsListComponent', () => {
  let component: AlimentsListComponent;
  let fixture: ComponentFixture<AlimentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
