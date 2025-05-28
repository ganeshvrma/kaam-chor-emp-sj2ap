import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobDetailPagePage } from './job-detail-page.page';

describe('JobDetailPagePage', () => {
  let component: JobDetailPagePage;
  let fixture: ComponentFixture<JobDetailPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
