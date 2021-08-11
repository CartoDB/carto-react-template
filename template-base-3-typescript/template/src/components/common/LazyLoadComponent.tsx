import { ReactNode, Suspense } from 'react';

export default function LazyLoadComponent({
  children,
  fallback = '',
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
