import { Suspense } from 'react';

export default function LazyLoadRoute({ children }) {
  return <Suspense fallback={''}>{children}</Suspense>;
}
