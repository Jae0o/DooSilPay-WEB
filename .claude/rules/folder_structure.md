# Folder Structure Rule (authoritative) — DooPay WEB

프론트엔드 폴더 구조·import·배럴·커스텀 훅 규약의 **확정 기준**. 코드 생성·이동·리팩터링 시 **항상** 따른다.

> 판정 절차(레이어 선택 플로우·widget↔feature·인터페이스/의존성)는 **`fsd-architecture-skill`** 을 따른다. 이 문서는 그 위에 **프로젝트 확정 사항**(전 레벨 배럴·커스텀 훅 폴더 패턴·레이어 alias)을 못 박는다.
> 훅 **분리 기준·폼 관리·오버엔지니어링 금지**는 `.claude/rules/agents_rules.md`(폴더·네이밍·배럴은 본 문서가 우선). **치수 단위(rem·62.5%)** 는 `.claude/rules/unit_convention.md`. 상위 설계: `.claude/docs/기획/기반-아키텍처.md §3`.

---

## 1. 레이어 (FSD)

| 레이어 | 역할 | 슬라이스 | 대표 세그먼트 |
|---|---|:---:|---|
| `app` | 프로바이더·라우팅·부트스트랩 | ✗ | `providers/`, `routing/`, `styles/` |
| `pages` | 라우트 조립 | ✓ | `ui/` |
| `widgets` | 복합 UI(모달·다기능 블록·독립 레이아웃) | ✓ | `ui/`, `hooks/`, `model/` |
| `features` | 단일 액션(1 micro-domain) | ✓ | `ui/`, `hooks/`, `model/` |
| `entities` | 도메인(api·hooks·model·utils, 도메인 UI) | ✓ | `api/`, `hooks/`, `model/`, `ui/`, `utils/` |
| `shared` | 도메인 비종속 공용 | ✗ | `ui/`, `hooks/`, `utils/`, `store/`, `api/`, `config/` |

**의존성 방향(단방향)**: `app → pages → widgets → features → entities → shared`. 상위만 하위를 import. `shared`가 leaf, `app`이 root. 위반 시 import가 아니라 **파일 위치를 옮긴다**.

| From | import 허용 |
|---|---|
| app | pages, widgets, features, entities, shared |
| pages | widgets, features, entities, shared |
| widgets | features, entities, shared |
| features | entities, shared |
| entities | shared |
| shared | (다른 레이어 금지) |

---

## 2. 슬라이스 / 세그먼트 구조

슬라이스 보유 레이어(`pages·widgets·features·entities`):

```
<layer>/<domain>/        ← 슬라이스
  ui/ hooks/ model/ api/ ...  ← 세그먼트
  index.ts                    ← 슬라이스 공개 인터페이스 (필수)
```

무슬라이스 레이어(`app·shared`)는 세그먼트를 바로 둔다(`shared/ui`, `shared/hooks`).

**서브슬라이스**: 슬라이스가 커지면 하위 슬라이스(`find/`·`create/`)로 분할. 서브슬라이스와 세그먼트가 같은 디렉터리에 공존하면 **세그먼트에 `_` 프리픽스**(`_model/`, `_hooks/`).

> 단일 파일을 위한 슬라이스를 만들지 않는다(과도 분할 금지). 1~2 파일이면 커질 때까지 인라인.

---

## 3. 배럴(index.ts) — API처럼 전 레벨 철저히

**모든 레벨에 `index.ts` 배럴**을 두고, 외부는 **인터페이스 경유로만** import한다. **딥 임포트 금지.**

배럴 계층: ① (훅 등) 단위 → ② 세그먼트(`hooks/`, `ui/`, `api/`) → ③ 슬라이스 root → (무슬라이스는 세그먼트가 곧 공개면).

```ts
// ✅ 인터페이스 경유
import { useStudent } from '@entities/student';
import { Button } from '@shared/ui';
// ❌ 딥 임포트
import { useStudent } from '@entities/student/hooks/useStudent';
import { Button } from '@shared/ui/Button/Button';
```

- 세그먼트 내부(같은 슬라이스) 파일끼리는 상대경로 직접 참조 허용. 인터페이스 규율은 **슬라이스 경계**에만 적용.
- **수평 참조(같은 레이어)**: 원칙 금지. 단 엔티티가 다른 엔티티 모델을 정당히 참조할 때만, 대상 슬라이스 **root `index.ts`** 로 노출하고 `'@<layer>/<slice>'`(세그먼트 없는 경로)로만 import.
  - 예: `entities/payment` 가 `student` 참조 → `import { Student } from '@entities/student'`.
- 배럴은 **선택 노출**: 내부 전용 헬퍼/매퍼/API 콜러는 export하지 않는다.

---

## 4. 커스텀 훅 패턴

### 4.1 분리 기준 (agents_rules.md — 오버엔지니어링 금지)

**훅으로 분리한다**: ①`useEffect`·observer·이벤트 리스너 등 **부수효과**를 동반하는 로직(예: 라우트 변경 시 드로어 닫힘, ResizeObserver 동기화), ②여러 컴포넌트에서 재사용하거나 store 인터페이스를 단순화하는 공용 진입점.

**훅으로 감싸지 않는다**: ①Zustand **selector 한두 줄 단순 읽기** → 컴포넌트에서 `useXxxStore(state => state.y)` 직접 호출(다시 훅으로 감싸지 않음), ②현재 소비하지 않는 액션까지 노출하는 래퍼 → 반환값은 **실제 쓰는 값만**.

**폼/입력 상태는 `react-hook-form`** 으로 관리한다(수동 `useState` 지양).

### 4.2 폴더 패턴 (folder-per-hook)

분리하기로 한 훅은 FSD `hooks/` 세그먼트 **안에서** 훅 1개 = **폴더 1개**로 둔다.

```
<...>/hooks/
  useDrawerAutoClose/
    useDrawerAutoClose.ts        # 구현 (arrow fn + export default 분리)
    useDrawerAutoClose.type.ts   # 타입 (파라미터 2개+ 또는 외부 import 시)
    useDrawerAutoClose.test.ts   # 콜로케이트 단위 테스트
    index.ts                     # export { default as useDrawerAutoClose } ...
  index.ts                       # 세그먼트 배럴: export * from './useDrawerAutoClose'
```

규칙:
- **파라미터는 객체 destructuring**(positional 금지), optional엔 기본값.
- **arrow function 정의 + `export default` 분리**.
- 단위 `index.ts`: `export { default as useX } from './useX';` (+ 필요 시 `export type { UseXParams } from './useX.type';`).
- 타입 네이밍: 파라미터 `Use{Hook}Params`, 반환 `Use{Hook}Return`(컴포넌트 아님 → `Props` 금지).
- 반환: **실제 소비하는 값만**. 기본 객체(`{ isOpen, open, close }`), useState 유사면 튜플 `as const`, 단일 계산값/Ref면 그 값.
- **cleanup 필수**: addEventListener·timer·Observer·AbortController·소켓 등 반드시 해제. 조건부 비활성은 `enabled` 파라미터.
- **단일 책임**: 하나의 훅 = 하나의 기능(`use{Behavior}` 동작 기준 명명).
- **배치**: 사용 범위가 좁을수록 호출처 가까이(전용 슬라이스 `hooks/`). 2곳+ 공유 시 `shared/hooks/`로 승격. **처음엔 전용으로 시작.**
- 훅 폴더는 **코드 파일만**(README/USAGE 등 문서 금지).

슬라이스 root는 외부에 필요한 훅만 재노출: `// entities/student/index.ts` → `export { useStudent } from './hooks';`

> 생성 시 `jae0-fe:custom-hook-create` 스킬의 유형별 템플릿/체크리스트를 참조.

---

## 5. Alias / Import (TS + Vite)

레이어별 path alias를 **TS와 Vite 양쪽**에서 동일 해석한다.

`tsconfig`(앱 설정). TS 6에서 `baseUrl`은 deprecated이므로 두지 않고, `paths` 타깃을 `./` 상대경로로 둔다(키는 `@`-프리픽스):
```jsonc
{
  "compilerOptions": {
    "paths": {
      "@app/*":      ["./src/app/*"],
      "@pages/*":    ["./src/pages/*"],
      "@widgets/*":  ["./src/widgets/*"],
      "@features/*": ["./src/features/*"],
      "@entities/*": ["./src/entities/*"],
      "@shared/*":   ["./src/shared/*"]
    }
  }
}
```

`vite.config.ts` / `vitest.config.ts`: `vite-tsconfig-paths` 플러그인으로 위 paths를 재사용(별도 alias 중복 정의 금지 — 단일 출처).

import 형태는 FSD 스킬 예시와 동일하되 **`@`-프리픽스 사용**: `import { Button } from '@shared/ui'`, `import { useStudent } from '@entities/student'`. 수평 참조는 항상 `'@<layer>/<slice>'`.

---

## 6. 네이밍

- `entities`/`pages`: 도메인 명사 lowercase (`student`, `payment`, `issued-receipt`).
- `features`: 동작 kebab-case (`issue-receipt`, `upload-payment-receipt`).
- `widgets`: 복합 서술 kebab-case (`bulk-payment-form`, `receipt-preview`).
- 서브슬라이스: lowercase 동사/한정어 (`find`, `create`, `mine`).
- 세그먼트: 표준명 `ui`/`hooks`/`model`/`api`/`utils`/`store`. 서브슬라이스 공존 시 `_` 프리픽스.
- 컴포넌트 파일 PascalCase(`StudentCard.tsx`), 훅 `useXxx`(camelCase, 동작 기준).

---

## 7. 시작 구조 (소규모 — 한 번에 6레이어 만들지 않음)

`shared / entities / pages` 중심으로 시작. 로직 2곳+ 재사용 시 `features`, 복합 UI(모달·다행 폼) 등장 시 `widgets`, Provider 설정이 루트 레이아웃을 넘어서면 `app` 도입.

---

## 8. 커밋 전 체크리스트

- [ ] 레이어가 역할과 일치(결정 플로우).
- [ ] 슬라이스 `index.ts`가 공개 API만 노출, 딥 임포트 없음.
- [ ] import가 모두 **하위 레이어**에서만. 수평 참조는 슬라이스 root 경로.
- [ ] 전 레벨 배럴 갱신(단위→세그먼트→슬라이스).
- [ ] 훅 분리 기준 충족(부수효과/재사용만, selector 직접 호출, 폼=react-hook-form, 반환=소비값만).
- [ ] 훅: 폴더 패턴·객체 파라미터·default export·`.type` 분리(필요시)·cleanup·단일 책임.
- [ ] widget이면 2+ feature 결합 또는 독립 레이아웃 / feature면 정확히 1 micro-domain.
