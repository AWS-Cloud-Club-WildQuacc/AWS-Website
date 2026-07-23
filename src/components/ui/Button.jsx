import { Link } from "react-router-dom";

export default function Button({
  to,
  href,
  variant = "orange",
  className = "",
  children,
  ...props
}) {
  const classes = `button button--${variant} ${className}`.trim();

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return <button className={classes} {...props}>{children}</button>;
}
