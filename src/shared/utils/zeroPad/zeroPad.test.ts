import { describe, expect, it } from 'vitest';

import { zeroPad } from './zeroPad';

describe('zeroPad', () => {
  it('기본 2자리로 0을 채운다', () => expect(zeroPad(1)).toBe('01'));
  it('width보다 긴 값은 그대로 둔다', () => expect(zeroPad(100)).toBe('100'));
  it('width를 지정할 수 있다', () => expect(zeroPad(7, 3)).toBe('007'));
});
