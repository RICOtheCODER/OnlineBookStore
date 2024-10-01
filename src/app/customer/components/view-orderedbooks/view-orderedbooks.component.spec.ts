import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderedbooksComponent } from './view-orderedbooks.component';

describe('ViewOrderedbooksComponent', () => {
  let component: ViewOrderedbooksComponent;
  let fixture: ComponentFixture<ViewOrderedbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOrderedbooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrderedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
