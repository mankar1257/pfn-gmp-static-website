import React from 'react';

type Cell = { ok: boolean; note?: string };
type Row = { requirement: string; cells: Cell[] };

const COLUMNS = ['Rad-hard board', 'TMR — 3× COTS', 'Do nothing', 'zkML proofs', 'DEOX'];

const ROWS: Row[] = [
  {
    requirement: 'Can run modern AI onboard',
    cells: [
      { ok: false, note: 'cannot run inference' },
      { ok: true },
      { ok: true },
      { ok: false, note: 'unusable on-orbit' },
      { ok: true },
    ],
  },
  {
    requirement: 'Fits a satellite power budget',
    cells: [
      { ok: true },
      { ok: false, note: '3× by construction' },
      { ok: true },
      { ok: false, note: '10³–10⁶× proving cost' },
      { ok: true, note: '1.37× arithmetic — ours, simulation, pre-silicon' },
    ],
  },
  {
    requirement: 'Emits per-answer, machine-checkable evidence',
    cells: [
      { ok: false, note: 'no check on answers' },
      { ok: false, note: 'a voter masks; certifies nothing' },
      { ok: false },
      { ok: true, note: 'proof against adversaries — a different threat model' },
      { ok: true, note: 'fault-soundness — the space threat model' },
    ],
  },
  {
    requirement: 'Ready for the assurance clause — auditable, per decision',
    cells: [
      { ok: false },
      { ok: false },
      { ok: false },
      { ok: false, note: 'fails the two rows above' },
      { ok: true, note: 'the certificate is the audit artifact' },
    ],
  },
];

/** Requirement × option matrix. Source: deck slide 10, cell for cell. */
const ComparisonMatrix: React.FC = () => (
  <div className="dx-hair overflow-x-auto border">
    <table className="w-full min-w-[880px] border-collapse">
      <thead>
        <tr>
          <th className="dx-label dx-rule-2 w-[24%] px-3.5 py-3 text-left font-normal">Requirement</th>
          {COLUMNS.map((c) => {
            const isDeox = c === 'DEOX';
            return (
              <th
                key={c}
                className={`dx-label px-3.5 py-3 text-left font-normal ${isDeox ? 'dx-gold-cell dx-gold-text' : 'dx-rule-2'}`}
                style={isDeox ? { borderTop: '1px solid var(--dx-gold)' } : undefined}
              >
                {c}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row, ri) => (
          <tr key={row.requirement}>
            <th
              scope="row"
              className={`px-3.5 py-4 text-left align-top text-[14.5px] font-normal ${ri < ROWS.length - 1 ? 'dx-hair-b' : ''}`}
            >
              {row.requirement}
            </th>
            {row.cells.map((cell, ci) => (
              <td
                key={ci}
                className={`px-3.5 py-4 align-top ${ri < ROWS.length - 1 ? 'dx-hair-b' : ''} ${ci === row.cells.length - 1 ? 'dx-gold-cell' : ''}`}
              >
                <span className={cell.ok ? 'dx-green-text' : 'dx-red-text'} aria-label={cell.ok ? 'meets' : 'fails'}>
                  {cell.ok ? '✓' : '✗'}
                </span>
                {cell.note && (
                  <div
                    className="mt-1 text-[12px]"
                    style={{ color: ci === row.cells.length - 1 ? 'var(--dx-dim)' : 'var(--dx-faint)' }}
                  >
                    {cell.note}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ComparisonMatrix;
