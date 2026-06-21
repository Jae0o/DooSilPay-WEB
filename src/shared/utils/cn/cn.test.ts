import { describe, expect, it } from 'vitest';

import cn from './cn';

describe('cn', () => {
  it('문자열을 공백으로 합친다', () => expect(cn('a', 'b')).toBe('a b'));
  it('falsy 값은 무시한다', () => expect(cn('a', false, null, undefined, '', 'b')).toBe('a b'));
  it('객체는 truthy 키만 포함한다', () => expect(cn('a', { b: true, c: false })).toBe('a b'));
});
