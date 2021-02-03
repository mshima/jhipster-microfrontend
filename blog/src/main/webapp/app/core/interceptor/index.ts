import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthExpiredInterceptor } from 'ng-jhipster/core/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'ng-jhipster/core/interceptor/error-handler.interceptor';
import { NotificationInterceptor } from 'ng-jhipster/core/interceptor/notification.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true,
  },
];
