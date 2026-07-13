import type { CSSProperties } from 'react';

import type { ReceiptTemplateProps } from './ReceiptTemplate.type';
import { receiptVM } from './receiptVM';

// RW-12 예외: 법정 서식 위젯 내부는 서식 고정 px·hex 인라인 스타일 (rem·테마 토큰 미사용).
const LINE = '#2a323c';

// 긴 텍스트는 칸 안에서 줄바꿈(overflowWrap)하고, 칸 높이는 내용량에 맞춰 늘어난다(고정 height 금지 — minHeight만).
const cell: CSSProperties = {
  borderRight: `1px solid ${LINE}`,
  borderBottom: `1px solid ${LINE}`,
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  minWidth: 0,
  overflowWrap: 'anywhere',
};

const labelCell = (extra?: CSSProperties): CSSProperties => ({
  ...cell,
  fontSize: 11.5,
  fontWeight: 600,
  lineHeight: 1.3,
  ...extra,
});

const valCell = (extra?: CSSProperties): CSSProperties => ({
  ...cell,
  fontSize: 12.5,
  color: '#1a222d',
  ...extra,
});

// 셀 내부 인라인 라벨("등록번호:" 등) + 중앙 정렬 값 — 값이 길면 줄바꿈되어 칸 높이를 밀어 올린다
const inlineLabel: CSSProperties = { fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap' };
const inlineValue: CSSProperties = {
  flex: 1,
  minWidth: 0,
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 12.5,
  overflowWrap: 'anywhere',
};

const ReceiptTemplate = ({ data, scale = 1, id }: ReceiptTemplateProps) => {
  const vm = receiptVM(data);

  return (
    <div
      id={id}
      className="receipt-block"
      style={{
        width: 384,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        fontFamily: 'var(--fontstack)',
        color: '#1a222d',
        background: '#fff',
        letterSpacing: '-0.01em',
      }}
    >
      {/* 제목 박스 */}
      <div
        style={{
          border: `2px solid ${LINE}`,
          textAlign: 'center',
          padding: '9px 12px',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '0.08em',
        }}
      >
        교습비등 영수증 원부
      </div>

      {/* 본문 박스 */}
      <div style={{ border: `2px solid ${LINE}`, marginTop: 10 }}>
        {/* 일련번호 · 연월(분기) — 값 경계를 납부자 행(48px 1fr 1fr)의 성명/교습과목 세로선과 정렬 */}
        <div style={{ display: 'grid', gridTemplateColumns: '48px calc((100% - 48px) / 2) 64px 1fr' }}>
          <div style={labelCell({ minHeight: 44 })}>
            일련
            <br />
            번호:
          </div>
          <div style={valCell({ justifyContent: 'center', fontWeight: 700 })} className="tnum">
            {vm.no}
          </div>
          <div style={labelCell({})}>
            연월
            <br />
            (분기):
          </div>
          <div style={valCell({ borderRight: 'none', justifyContent: 'center', fontWeight: 700 })} className="tnum">
            {vm.periodShort}
          </div>
        </div>

        {/* 납부자 */}
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 1fr' }}>
          <div style={labelCell({ gridRow: 'span 2', justifyContent: 'center' })}>납부자</div>
          <div style={valCell({ minHeight: 40 })}>
            <span style={inlineLabel}>등록번호:</span>
            <span style={inlineValue} className="tnum">
              {vm.regNo}
            </span>
          </div>
          <div style={valCell({ borderRight: 'none' })}>
            <span style={inlineLabel}>성명:</span>
            <span style={inlineValue}>{vm.name}</span>
          </div>
          <div style={valCell({ minHeight: 40 })}>
            <span style={inlineLabel}>생년월일:</span>
            <span style={inlineValue} className="tnum">
              {vm.birth}
            </span>
          </div>
          <div style={valCell({ borderRight: 'none' })}>
            <span style={inlineLabel}>교습과목:</span>
            <span style={inlineValue}>{vm.subject}</span>
          </div>
        </div>

        {/* 납부명세 — 교습비 1열 + 기타경비 3열. 행 높이는 auto(내용 따라 증가), 최소치는 셀 minHeight로 보장 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 84px 1fr 1fr 1fr',
          }}
        >
          <div style={labelCell({ gridRow: 'span 3', justifyContent: 'center' })}>
            납부
            <br />
            명세
          </div>
          <div style={labelCell({ gridRow: 'span 2', justifyContent: 'center', fontSize: 12 })}>교습비</div>
          <div
            style={labelCell({
              gridColumn: '3 / 6',
              borderRight: 'none',
              justifyContent: 'center',
              fontSize: 12,
              minHeight: 26,
            })}
          >
            기타경비
          </div>
          {vm.others.map((other, index) => (
            <div
              key={`label-${index}`}
              style={valCell({
                justifyContent: 'center',
                fontSize: 11.5,
                minHeight: 34,
                ...(index === 2 ? { borderRight: 'none' } : {}),
              })}
            >
              {other.label}
            </div>
          ))}
          <div style={valCell({ justifyContent: 'center', fontWeight: 700, minHeight: 38 })} className="tnum">
            {vm.tuitionText}
          </div>
          {vm.others.map((other, index) => (
            <div
              key={`amount-${index}`}
              style={valCell({
                justifyContent: 'center',
                fontWeight: 700,
                minHeight: 38,
                ...(index === 2 ? { borderRight: 'none' } : {}),
              })}
              className="tnum"
            >
              {other.amountText}
            </div>
          ))}
        </div>

        {/* 증명 문구 */}
        <div style={{ padding: '12px 14px 0', textAlign: 'center', fontSize: 12, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 500 }}>위와 같이 영수하였음을 증명합니다.</div>
        </div>

        {/* 발급일 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 34, padding: '14px 28px 0', fontSize: 12 }}>
          <span>
            <b className="tnum">{vm.issuedYY}</b> 년
          </span>
          <span>
            <b className="tnum">{vm.issuedMonth}</b> 월
          </span>
          <span>
            <b className="tnum">{vm.issuedDay}</b> 일
          </span>
        </div>

        {/* 발행 주체 + 서명 */}
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 14px' }}
        >
          <div style={{ fontSize: 11.5, fontWeight: 500, textAlign: 'center', lineHeight: 1.5 }}>
            학원설립 · 운영자 또는 교습자
            <br />
            또는 개인과외 교습자
          </div>
          {vm.signatureUrl ? (
            <img
              src={vm.signatureUrl}
              alt="서명"
              style={{ width: 48, height: 48, objectFit: 'contain', flexShrink: 0 }}
            />
          ) : (
            <span style={{ color: '#aeb6bf', fontSize: 12, whiteSpace: 'nowrap' }}>(서명 또는 인)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptTemplate;
