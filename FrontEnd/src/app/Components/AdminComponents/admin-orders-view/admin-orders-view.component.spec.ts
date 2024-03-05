import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersViewComponent } from './admin-orders-view.component';

describe('AdminOrdersViewComponent', () => {
  let component: AdminOrdersViewComponent;
  let fixture: ComponentFixture<AdminOrdersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrdersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
