import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesViewComponent } from './admin-categories-view.component';

describe('AdminCategoriesViewComponent', () => {
  let component: AdminCategoriesViewComponent;
  let fixture: ComponentFixture<AdminCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoriesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
