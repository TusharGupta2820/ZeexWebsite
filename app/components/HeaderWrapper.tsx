"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // hide header on the root splash page '/'
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (pathname === '/') {
      document.body.classList.remove('has-header');
    } else {
      document.body.classList.add('has-header');
    }
    return () => { document.body.classList.remove('has-header'); };
  }, [pathname]);

  if (pathname === '/') return null;

  return <Header />;
}
