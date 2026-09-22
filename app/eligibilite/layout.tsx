import React from 'react';
import PageClaire from '../components/PageClaire';

export default function EligibiliteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageClaire page="eligibilite">{children}</PageClaire>
  );
}
