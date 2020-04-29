import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFilteringComponent } from './recipe-filtering.component';

describe('RecipeFilteringComponent', () => {
  let component: RecipeFilteringComponent;
  let fixture: ComponentFixture<RecipeFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
