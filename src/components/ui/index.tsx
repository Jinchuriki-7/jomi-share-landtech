import clsx from 'clsx';

interface BadgeProps {
  variant?: 'green' | 'red' | 'yellow' | 'blue' | 'gray' | 'navy' | 'orange';
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  green: 'bg-brand-100 text-brand-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  blue: 'bg-blue-100 text-blue-700',
  gray: 'bg-gray-100 text-gray-600',
  navy: 'bg-indigo-100 text-indigo-700',
  orange: 'bg-orange-100 text-orange-700',
};

export function Badge({ variant = 'gray', children, className }: BadgeProps) {
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', variantClasses[variant], className)}>
      {children}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: { value: number; label: string };
}

export function StatCard({ label, value, sub, icon, color = 'bg-brand-50' }: StatCardProps) {
  return (
    <div className="card flex items-start gap-4">
      {icon && (
        <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', color)}>
          {icon}
        </div>
      )}
      <div>
        <div className="text-2xl font-bold text-navy-800">{value}</div>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, color = 'bg-brand-500', label, showValue = true }: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-500">{label}</span>}
          {showValue && <span className="text-xs font-medium text-navy-700">{Math.round(value)}%</span>}
        </div>
      )}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h1 className="text-xl font-bold text-navy-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

interface AlertBoxProps {
  type: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const alertStyles: Record<string, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-brand-50 border-brand-200 text-brand-800',
};

export function AlertBox({ type, title, children, className }: AlertBoxProps) {
  return (
    <div className={clsx('rounded-lg border px-4 py-3 text-sm', alertStyles[type], className)}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      {children}
    </div>
  );
}

interface HeirAvatarProps {
  name: string;
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HeirAvatar({ initials, color, size = 'md' }: HeirAvatarProps) {
  const sizeClass = { sm: 'w-6 h-6 text-[10px]', md: 'w-8 h-8 text-xs', lg: 'w-10 h-10 text-sm' }[size];
  return (
    <div
      className={clsx('rounded-full flex items-center justify-center font-bold text-white flex-shrink-0', sizeClass)}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

interface ScoreMeterProps {
  score: number;
  label: string;
  size?: 'sm' | 'md';
}

export function ScoreMeter({ score, label, size = 'md' }: ScoreMeterProps) {
  const color = score >= 75 ? 'text-brand-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';
  const bg = score >= 75 ? 'bg-brand-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  const sizeClass = size === 'sm' ? 'text-lg' : 'text-2xl';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={clsx('font-bold', color, sizeClass)}>{Math.round(score)}</div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={clsx('h-full rounded-full', bg)} style={{ width: `${score}%` }} />
      </div>
      <div className="text-[10px] text-gray-500 text-center leading-tight">{label}</div>
    </div>
  );
}
