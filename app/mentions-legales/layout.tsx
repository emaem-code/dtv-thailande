import React from 'react';
import PageClaire from '../components/PageClaire';

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageClaire page="mentions">{children}</PageClaire>
  );
}
