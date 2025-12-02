import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportDetailsComponent } from './report-details.component';
import { provideRouter } from '@angular/router';
import { ReportDetailsApiService } from './services/report-details-api.service';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MOCK_REPORT_DETAILS, ReportDetails } from './models/report-details.model';

describe('ReportDetailsComponent', () => {
  let component: ReportDetailsComponent;
  let fixture: ComponentFixture<ReportDetailsComponent>;
  let mockReportDetailsApiService: jasmine.SpyObj<ReportDetailsApiService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockReportDetails: ReportDetails = MOCK_REPORT_DETAILS[0];

  beforeEach(async () => {
    mockReportDetailsApiService = jasmine.createSpyObj('ReportDetailsApiService', ['getReportDetails']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('123')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReportDetailsComponent],
      providers: [
        provideRouter([]),
        { provide: ReportDetailsApiService, useValue: mockReportDetailsApiService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading true and error false', () => {
    expect(component.loading).toBe(true);
    expect(component.error).toBe(false);
  });

  it('should load report details on init when authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);
    mockReportDetailsApiService.getReportDetails.and.returnValue(of(mockReportDetails));

    component.ngOnInit();

    expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    expect(mockReportDetailsApiService.getReportDetails).toHaveBeenCalledWith('123');
    expect(component.data).toEqual(mockReportDetails);
    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);
  });

  it('should handle error when loading report details fails', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);
    mockReportDetailsApiService.getReportDetails.and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(component.error).toBe(true);
    expect(component.loading).toBe(false);
  });

  it('should not load report details when not authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    component.ngOnInit();

    expect(mockReportDetailsApiService.getReportDetails).not.toHaveBeenCalled();
  });

  it('should handle missing reportId with empty string', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);
    mockAuthService.isAuthenticated.and.returnValue(true);
    mockReportDetailsApiService.getReportDetails.and.returnValue(of(mockReportDetails));

    component.ngOnInit();

    expect(mockReportDetailsApiService.getReportDetails).toHaveBeenCalledWith('');
  });

  it('should navigate to home when goToHome is called', () => {
    component.goToHome();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
