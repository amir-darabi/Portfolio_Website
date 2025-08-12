import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-fuchsia-900/30 text-white shadow-lg shadow-fuchsia-800/50 exo2-regular transform transition-all hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-black/30 text-white shadow-lg shadow-blue-500/50 border-blue-500 exo2-regular transform transition-all hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-blue-600 text-blue-600 bg-transparent shadow-lg shadow-blue-500/40 hover:bg-blue-50 hover:shadow-2xl hover:shadow-blue-500/60',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={disabled || loading ? (e) => e.preventDefault() : undefined}
      >
        {loading && <span className="mr-2">⏳</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="mr-2">⏳</span>}
      {children}
    </button>
  );
};

export default Button;
