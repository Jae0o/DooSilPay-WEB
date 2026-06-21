# 단위 규약 (authoritative) — DooPay WEB

치수(길이·폰트·간격) 단위의 **확정 기준**. 컴포넌트·스타일 작성 시 **항상** 따른다.

## 1. 루트 — `html 62.5%`

`src/app/styles/index.css`에서 `html { font-size: 62.5% }` → **1rem = 10px**. `body { font-size: 1.6rem }`(=16px)로 기본 텍스트 크기 지정.

**변환 공식: `rem = px ÷ 10`** (예: 16px → 1.6rem, 12px → 1.2rem, 4px → 0.4rem).

## 2. Tailwind — 수치는 rem으로 직접 명시

Tailwind v4 기본 스케일(`--spacing`·`--text-*`)은 rem 기반이라 62.5% 루트에서 62.5%로 **축소**된다. 따라서 **기본 스케일 유틸을 쓰지 않고, arbitrary 값으로 단위를 직접 명시**한다.

```tsx
// ✅ 단위 직접 명시 (rem)
<div className="p-[1.6rem] gap-[1rem] text-[1.4rem] w-[2rem] rounded-[1rem]" />
// ❌ 기본 rem 스케일 유틸 (62.5%에서 깨짐)
<div className="p-4 gap-2.5 text-sm w-5" />
```

- 적용 대상: spacing(`p`/`m`/`gap`/`space`), font-size(`text-`), width/height(`w`/`h`/`size`), 직접 지정 `rounded`/`shadow`.
- `text-[..rem]`은 font-size만 설정 → 필요 시 `leading-[..]`로 line-height도 명시.

## 3. 예외 — 시맨틱 토큰은 허용

`@theme`에 정의된 **디자인 토큰**은 이름으로 그대로 사용한다(축소되지 않음 — 토큰 값 자체가 rem/색):
- 색: `bg-point`, `text-ink`, `border-line` …
- 라운드: `rounded-md`(=`--radius-md`), 섀도: `shadow-md`(=`--shadow-md`).

토큰의 px 값은 rem으로 통일되어 있다(`--radius-md: 1.2rem`, `--shadow-md: 0 0.4rem …`).

## 4. 컴포넌트 size prop — rem 문자열

치수를 받는 prop은 **단위 명시 rem 문자열**로 둔다(숫자 px 금지).

```tsx
// Icon
size = '2rem'                 // 20px
<svg width={size} height={size} />
// 비례 계산이 필요하면 CSS calc
style={{ fontSize: `calc(${size} * 0.56)` }}
```

## 5. 비고

- 색·라운드·섀도 외 **모든 길이/폰트/간격은 rem**. px 리터럴은 `--radius-pill: 999px`처럼 센티넬에만.
- 상위 설계·폴더/배럴/훅 규약은 `folder_structure.md`·`agents_rules.md` 참조.
