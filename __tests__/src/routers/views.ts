import * as Views from '@/src/routers/views';

test.each(Object.values(Views).map(cmp => [cmp]))(
  'imports(%o)',
  (input: any) => {
    expect(input()).toBeInstanceOf(Promise);
  }
);