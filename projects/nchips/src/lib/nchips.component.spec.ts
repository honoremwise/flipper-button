import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NChipsComponent } from './nchips.component';

describe('NChipsComponent', () => {
  let component: NChipsComponent;
  let fixture: ComponentFixture<NChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
