import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicDetailsPagePage } from './basic-details-page.page';

describe('BasicDetailsPagePage', () => {
  let component: BasicDetailsPagePage;
  let fixture: ComponentFixture<BasicDetailsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
