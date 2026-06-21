type ClassValue = string | number | null | undefined | false | Record<string, boolean | undefined>;

/** 조건부 className 합성. 문자열·숫자는 그대로, falsy 무시, 객체는 truthy 키만. */
const cn = (...values: ClassValue[]): string => {
  const classes: string[] = [];
  for (const value of values) {
    if (!value) continue;

    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value));

      continue;
    }

    for (const [key, enabled] of Object.entries(value)) if (enabled) classes.push(key);
  }

  return classes.join(' ');
};

export default cn;
