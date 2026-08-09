export default function AmbientField({ compact = false }) {
  return (
    <div className={`ambient-field ${compact ? 'ambient-field-compact' : ''}`} aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orbit ambient-orbit-one"><i /></div>
      <div className="ambient-orbit ambient-orbit-two"><i /></div>
      <span className="ambient-code ambient-code-one">{'{ 01 }'}</span>
      <span className="ambient-code ambient-code-two">&lt;/&gt;</span>
      <span className="ambient-cross ambient-cross-one" />
      <span className="ambient-cross ambient-cross-two" />
      <div className="ambient-scan" />
    </div>
  );
}
