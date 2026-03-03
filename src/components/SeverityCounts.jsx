export default function SeverityCounts({ counts, style }) {
  return (
    <>
      <span style={{color:'var(--critical)',...style}}>Critical: {counts.critical||0}</span>
      <span style={{color:'var(--high)',...style}}>High: {counts.high||0}</span>
      <span style={{color:'var(--medium)',...style}}>Medium: {counts.medium||0}</span>
      <span style={{color:'var(--low)',...style}}>Low: {counts.low||0}</span>
    </>
  )
}
