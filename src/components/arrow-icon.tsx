const paths = {
  diagonal: 'M4 12 12 4M5 4h7v7',
  down: 'M8 3v10m-4-4 4 4 4-4',
};

export function ArrowIcon({ direction = 'diagonal' }: { direction?: keyof typeof paths }) {
  return <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16"
    fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
    className="action-arrow"><path d={paths[direction]} /></svg>;
}
