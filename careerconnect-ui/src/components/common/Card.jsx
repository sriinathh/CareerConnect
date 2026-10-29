/**
 * Reusable Glassmorphism Card component.
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div className={`glass-panel ${className}`} {...props}>
      {children}
    </div>
  );
}
