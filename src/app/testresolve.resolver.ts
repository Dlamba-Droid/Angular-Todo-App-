import { ResolveFn } from '@angular/router';

export const testresolveResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
