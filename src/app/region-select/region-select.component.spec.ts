import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionSelectComponent } from './region-select.component';

describe('RegionSelectComponent', () => {
  let component: RegionSelectComponent;
  let fixture: ComponentFixture<RegionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
