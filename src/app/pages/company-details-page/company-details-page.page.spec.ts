import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailsPagePage } from './company-details-page.page';

describe('CompanyDetailsPagePage', () => {
  let component: CompanyDetailsPagePage;
  let fixture: ComponentFixture<CompanyDetailsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
