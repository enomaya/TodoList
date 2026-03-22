# CLAUDE.md

이 파일은 Claude Code가 이 프로젝트에서 작업할 때 참고하는 가이드입니다.

---

## 프로젝트 개요

간단한 투두리스트 웹앱

---

## 기술 스택

| 영역 | 도구 | 버전 |
|------|------|------|
| UI 프레임워크 | React | 19.2.4 |
| 언어 | TypeScript | 5.9.3 |
| 빌드 도구 | Vite | 8.0.1 |
| 스타일링 | CSS Modules | — |
| 상태 관리 | useState / useReducer (단순), Zustand (전역 필요 시) | — |
| 폼 | React Hook Form | — |
| 테스트 | Vitest + React Testing Library | 4.1.0 / 16.3.2 |
| 린팅 | ESLint Flat Config + typescript-eslint | 9.39.4 / 8.57.0 |
| 포매팅 | Prettier | — |

### React 19 주요 활용 지침

- **React Compiler** 활성화 시 `useMemo` / `useCallback` 수동 최적화 최소화
- **Actions API** 사용: 폼 제출 및 비동기 상태(pending, error)는 `useActionState` / `useOptimistic` 활용
- `forwardRef` 대신 함수형 컴포넌트에서 `ref`를 직접 prop으로 받을 것
- `<title>` / `<meta>` 관리는 컴포넌트 내에서 직접 선언 가능

### TypeScript 지침

- `any` 사용 금지 — 불가피한 경우 `unknown` 사용 후 타입 가드로 좁힐 것
- `interface`보다 `type` 우선 (유연성), 단 객체 확장이 명시적으로 필요한 경우 `interface` 사용
- `--strict` 모드 활성화 필수
- `--erasableSyntaxOnly` + `--verbatimModuleSyntax` 조합으로 엄격한 모듈 체계 유지
- 조건부 타입, 템플릿 리터럴 타입, 매핑 타입을 적극 활용

---

## 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (http://localhost:5173) |
| `npm run build` | 프로덕션 빌드 (`dist/` 생성) |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
| `npm run lint` | ESLint 검사 실행 |
| `npm test` | 테스트 워치 모드 실행 |
| `npm run test:run` | 테스트 단일 실행 (CI용) |

---

## 프로젝트 구조

```
src/
├── assets/            # 이미지, 폰트 등 정적 자원
├── components/        # 공통 재사용 컴포넌트
│   └── ui/            # 버튼, 입력창 등 원자 단위 컴포넌트
├── features/          # 기능 단위 모듈 (예: todo/)
│   └── todo/
│       ├── components/
│       ├── hooks/
│       ├── types.ts
│       └── index.ts
├── hooks/             # 전역 공통 훅
├── store/             # Zustand 스토어 (전역 상태 필요 시)
├── utils/             # 순수 유틸리티 함수
├── App.tsx
└── main.tsx
```

**파일 네이밍**: 컴포넌트 파일은 PascalCase (`TodoItem.tsx`), 나머지는 kebab-case (`use-todo-list.ts`)

---

## 코딩 규칙

### 코드 스타일

- **들여쓰기**: 스페이스 2칸
- **따옴표**: 문자열은 작은따옴표(`'`) 사용, JSX 속성은 큰따옴표(`"`) 사용
- **세미콜론**: 생략 (ASI 활용)
- **후행 쉼표**: 여러 줄 객체/배열의 마지막 요소에 쉼표 추가
- **줄 길이**: 최대 100자
- **함수 선언**: 컴포넌트는 `function` 선언식, 일반 함수는 화살표 함수 우선
- **import 순서**: 외부 라이브러리 → 내부 모듈 → 상대 경로 순, 각 그룹 사이 빈 줄 구분

```ts
// ✅ import 순서 예시
import { useState } from 'react'
import type { FC } from 'react'

import { useTodo } from '@/features/todo'

import type { Todo } from './types'
import styles from './TodoItem.module.css'
```

### 컴포넌트

- 함수형 컴포넌트만 사용, 클래스 컴포넌트 작성 금지
- props 타입은 컴포넌트 파일 내 `type Props = { ... }` 형태로 정의
- 단일 책임 원칙 — 하나의 컴포넌트는 하나의 역할만 담당
- 비즈니스 로직은 커스텀 훅으로 분리

### 상태 관리

- 컴포넌트 로컬 상태: `useState` / `useReducer`
- 전역 클라이언트 상태: Zustand
- 서버 상태(API 연동 시): TanStack Query
- Context API는 테마, 인증 등 변경이 드문 전역 값에만 사용

### 타입 안전성

```ts
// ❌ 피할 것
const handler = (e: any) => { ... }

// ✅ 권장
const handler = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```

---

## 커밋 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따르며, **메시지는 한글로 작성**한다.

### 형식

```
<type>(<scope>): <설명>

[본문 - 선택]

[꼬리말 - 선택]
```

### 타입 목록

| 타입 | 용도 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 개선 |
| `style` | 포매팅, 세미콜론 등 코드 스타일 변경 |
| `test` | 테스트 코드 추가/수정 |
| `docs` | 문서 수정 |
| `chore` | 빌드, 패키지 설정 등 기타 작업 |
| `perf` | 성능 개선 |

### 예시

```
feat(todo): 할 일 완료 토글 기능 추가
fix(todo): 빈 문자열 입력 시 항목 추가되는 버그 수정
refactor(hooks): useTodoList 훅 로직 분리
chore: vitest 설정 추가
```

---

## 문제 해결 우선순위

1. **실제 동작하는 해결책** — 이론보다 작동하는 코드 우선
2. **기존 코드 패턴 분석** — 수정 전 반드시 관련 코드를 읽고 일관성 유지
3. **타입 안전성 보장** — 런타임 오류보다 컴파일 타임 오류가 낫다
4. **재사용 가능한 구조** — 단, 현재 필요한 범위를 넘어선 과도한 추상화 금지

---

## 테스트

- 테스트 파일 위치: 대상 파일과 같은 디렉터리에 `*.test.tsx` 형태로 배치
- 구현 세부사항이 아닌 **사용자 행동과 결과** 기준으로 테스트 작성
- 커버리지 대상: 사용자 인터랙션, 엣지 케이스(빈 입력, 오류 상태 등)

```ts
// ✅ 권장: 사용자 관점
test('할 일을 추가하면 목록에 표시된다', async () => {
  const user = userEvent.setup()
  render(<TodoApp />)
  await user.type(screen.getByRole('textbox'), '운동하기')
  await user.click(screen.getByRole('button', { name: '추가' }))
  expect(screen.getByText('운동하기')).toBeInTheDocument()
})
```

---

## 절대 수정 금지 파일

아래 파일들은 프로젝트 설정의 핵심으로, 명시적인 요청 없이 절대 수정하지 않는다.

| 파일 | 이유 |
|------|------|
| `package-lock.json` | npm이 자동 관리하는 의존성 잠금 파일 — 직접 편집 금지 |
| `tsconfig.json` | TypeScript 프로젝트 레퍼런스 루트 설정 |
| `tsconfig.app.json` | 앱 소스 컴파일 설정 — strict 모드 포함 |
| `tsconfig.node.json` | Vite 설정 파일용 TypeScript 설정 |
| `vite.config.ts` | 빌드 및 테스트 환경 설정 |
| `eslint.config.js` | 린트 규칙 설정 |
| `src/main.tsx` | 앱 진입점 — 렌더링 루트 |
| `src/test/setup.ts` | 테스트 전역 설정 (jest-dom 확장) |

---

## 금지 사항

- `console.log` 를 커밋에 포함하지 말 것 (디버깅 후 제거)
- `eslint-disable` 주석 사용 금지 (정당한 이유가 있으면 PR에 설명)
- 사용하지 않는 import / 변수 방치 금지
- `as any` 타입 캐스팅 금지
