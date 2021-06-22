import { Suspense } from 'react';
import TopLoading from './TopLoading';

export default function LazyLoadRoute({ children }) {
  return <Suspense fallback={<TopLoading />}>{children}</Suspense>;
}
