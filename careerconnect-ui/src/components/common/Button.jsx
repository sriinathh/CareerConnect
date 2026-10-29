/**
 * Reusable Button component supporting variants (primary, secondary, outline).
 */
export function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
