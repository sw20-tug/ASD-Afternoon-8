import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteCookingComponent } from './onsite-cooking.component';

describe('OnsiteCookingComponent', () => {
  let component: OnsiteCookingComponent;
  let fixture: ComponentFixture<OnsiteCookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnsiteCookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnsiteCookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
