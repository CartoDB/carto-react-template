import { ReactNode, Suspense } from 'react';
import TopLoading from './TopLoading';

export default function LazyLoadRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<TopLoading />}>{children}</Suspense>;
}
