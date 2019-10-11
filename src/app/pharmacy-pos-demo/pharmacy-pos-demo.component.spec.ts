import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPosDemoComponent } from './pharmacy-pos-demo.component';

describe('PharmacyPosDemoComponent', () => {
  let component: PharmacyPosDemoComponent;
  let fixture: ComponentFixture<PharmacyPosDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyPosDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPosDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
