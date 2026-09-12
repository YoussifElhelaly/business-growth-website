export function BrandMark({ size = 42, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Business Growth"
      className={`shrink-0 ${className}`}
    >
      <rect x="1.2" y="1.2" width="45.6" height="45.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M11 38V27l5.5-8 5.5 8v11z" fill="currentColor" opacity=".42" />
      <path d="M19.5 38V20l5.5-8 5.5 8v18z" fill="currentColor" opacity=".70" />
      <path d="M28 38V13l5.5-8 5.5 8v25z" fill="currentColor" />
    </svg>
  );
}
