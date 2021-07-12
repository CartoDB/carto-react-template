import { Suspense } from 'react';
import TopLoading from './TopLoading';

export default function LazyLoadRoute({ children, fallback = <TopLoading /> }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
