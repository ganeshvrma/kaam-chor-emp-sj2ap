import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateListPage } from './candidate-list.page';

describe('CandidateListPage', () => {
  let component: CandidateListPage;
  let fixture: ComponentFixture<CandidateListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
