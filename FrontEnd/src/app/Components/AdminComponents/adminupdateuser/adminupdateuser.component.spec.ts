import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminupdateuserComponent } from './adminupdateuser.component';

describe('AdminupdateuserComponent', () => {
  let component: AdminupdateuserComponent;
  let fixture: ComponentFixture<AdminupdateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminupdateuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminupdateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
