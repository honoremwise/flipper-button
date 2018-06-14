import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdropItemComponent } from './ndrop-item.component';

describe('NdropItemComponent', () => {
  let component: NdropItemComponent;
  let fixture: ComponentFixture<NdropItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdropItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdropItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
