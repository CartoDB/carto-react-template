import { Suspense } from 'react';

export default function LazyLoadComponent({ children, fallback = '' }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
