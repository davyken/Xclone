import cn from 'clsx';
import { CustomIcon } from './custom-icon';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className,
  iconClassName
}: LoadingProps): JSX.Element {
  return (
    <i className={cn('flex justify-center', className ?? 'p-4')}>
      <CustomIcon
        className={cn('text-main-accent animate-spin', iconClassName ?? 'h-7 w-7')}
        iconName='XIcon'
      />
    </i>
  );
}
