import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlettersComponent } from './newletters.component';

describe('NewlettersComponent', () => {
  let component: NewlettersComponent;
  let fixture: ComponentFixture<NewlettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
