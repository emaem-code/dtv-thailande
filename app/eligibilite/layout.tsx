import React from 'react';
import SiteHeader from '../components/SiteHeader';

export default function EligibiliteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
