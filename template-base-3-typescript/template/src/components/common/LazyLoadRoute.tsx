import { Suspense } from 'react';
import TopLoading from './TopLoading';

export default function LazyLoadRoute({
  children,
  fallback = <TopLoading />,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
