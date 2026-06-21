---
paths:
  - "**/*"
---

# 에이전트 작업 규칙

## 디버깅 중 시도한 수정 정리

문제의 원인을 분석·탐색하는 과정에서 추정으로 넣은 수정이 실제 원인과 무관함(동작에 영향 없음)이

확인되면 반드시 롤백한다. 최종 변경에는 진짜 원인을 고친 코드만 남긴다.

## 오버엔지니어링 금지

요청한 것만 구현한다. 미사용 props·추상화·speculative 한 유연성을 추가하지 않는다. 더 단순한 방법이 있으면 그쪽을 택한다.

## FE 아키텍처 (FSD)

프론트엔드 프로젝트는 **FSD(Feature-Sliced Design)** 구조를 사용한다(`app > pages > widgets > features > entities > shared` 단방향). 레이어·슬라이스·세그먼트 배치, 전 레벨 배럴, 단방향 의존은 **`.claude/rules/folder_structure.md`** 를 따른다.

## Barrel Import

**모든 레벨에 `index.ts` 배럴**을 두고 외부는 배럴(공개 인터페이스) 경유로만 import한다. 딥 임포트 금지(같은 슬라이스 내부 상대경로만 예외). 상세는 `.claude/rules/folder_structure.md §3`.

## 폴더 구조 (folder-per-unit)

컴포넌트·훅·store·provider 등 **단위 1개 = 폴더 1개**로 둔다: `<Name>/<Name>.{tsx,ts}` 구현 + `<Name>/index.ts` 배럴(예: `AppTitle/`, `useToggle/`, `useUiStore/`, `QueryProvider/`). 세그먼트 배럴은 각 단위를 재노출한다. 상세는 `.claude/rules/folder_structure.md §3·§4`.

**보조 유닛은 의미 폴더로 묶는다**: 세그먼트에 명확한 **메인 산출물**(예: `routing`의 `router`)이 있고 그와 **성격이 다른 보조 유닛**(예: 가드)이 함께 있으면, 보조 유닛은 역할 기반 **의미 폴더**로 묶어 메인과 구분한다(예: `routing/guards/ProtectedRoute/`, 배럴 `guards/index.ts`). 폴더명은 역할로 짓고(`guards/` 등) provider 등 부정확한 이름은 쓰지 않는다 — 가드는 상태를 공급하지 않으므로 provider가 아니다.

## export 규칙

**내보낼 대상이 1개거나 명확한 default가 존재하면 반드시 `export default`** 로 내보내고, 배럴에서 `export { default as Name }`(또는 `export *`)로 재노출한다. export가 여러 개(서로 대등)면 named export를 쓴다.

## Alias 강제

alias가 정의된 경로는 **반드시 alias로 import**한다(상대경로 `../../` 로 슬라이스 경계를 넘지 않음). 현재 레이어 alias는 `@`-프리픽스(`@shared/ui`, `@entities/student` …)이며 딥 임포트는 금지(규약 §5). 세그먼트 내부 같은 슬라이스 파일끼리의 상대경로 참조만 예외.

## Form / Input 관리

폼·입력 상태는 `react-hook-form` 으로 관리한다. 수동 `useState` 관리는 지양한다.

## Prettier / Lint 준수

모든 변경은 프로젝트의 `prettier`·`eslint` 설정을 통과해야 한다. 작업 완료 전 포맷·린트를 적용해 위반이 없는 상태로 남긴다.

## Custom Hook 분리 기준

부수효과를 동반하거나 재사용되는 로직만 custom hook 으로 분리한다. zustand store 접근은

컴포넌트에서 selector(`useXxxStore(state => state.y)`)를 직접 호출하는 것이 기본이며, 이를 다시

훅으로 감싸지 않는다.

**훅으로 분리한다**:

- `useEffect`·observer·이벤트 리스너 등 **부수효과**를 동반하는 로직 (예: 라우트 변경 시 드로어 닫힘, ResizeObserver 동기화).

- 여러 컴포넌트에서 재사용하거나, store 인터페이스를 단순화하는 공용 진입점(public API).

**훅으로 감싸지 않는다(오버엔지니어링)**:

- selector 한두 줄 단순 읽기 — 컴포넌트에서 직접 호출한다.

- 현재 소비하지 않는 액션까지 노출하는 래퍼 — 반환값은 실제 쓰는 값만 둔다.

배치·네이밍은 일반 원칙을 따른다: 동작 기준으로 `use{Behavior}` 로 명명하고, 사용 범위가 좁을수록

호출처 가까이 두며, 두 곳 이상에서 공유하면 공용 훅 디렉터리로 승격한다. 반환값은 실제 소비하는

값만 노출한다. 프로젝트에 별도의 폴더·네이밍·barrel 컨벤션 문서가 있으면 그 규칙을 우선한다.
