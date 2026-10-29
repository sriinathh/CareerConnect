/**
 * Reusable Badge component for tags, roles, and status indicators.
 */
export function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}
