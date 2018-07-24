import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NDropComponent } from './ndrop.component';

describe('NDropComponent', () => {
  let component: NDropComponent;
  let fixture: ComponentFixture<NDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
