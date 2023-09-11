import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { testresolveResolver } from './testresolve.resolver';

describe('testresolveResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => testresolveResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
