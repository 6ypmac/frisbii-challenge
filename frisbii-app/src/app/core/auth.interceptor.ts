import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Apply auth header only to Frisbii API requests
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const requestWithAuth = req.clone({
    setHeaders: {
      Authorization: 'Basic ' + btoa(environment.apiKey + ':')
    }
  });

  return next(requestWithAuth);
};
