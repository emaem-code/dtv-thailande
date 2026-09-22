import React from 'react';
import PageClaire from '../components/PageClaire';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageClaire page="contact">{children}</PageClaire>
  );
}
