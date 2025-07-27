'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './DesktopHeader.module.scss';

type Tab = 'home' | 'posts' | 'new' | 'profile';

const routeMap: Record<Tab, string> = {
  home: '/',
  posts: '/posts',
  new: '/posts/new',
  profile: '/profile',
};

const reverseRouteMap: Record<string, Tab> = {
  '/': 'home',
  '/posts': 'posts',
  '/posts/new': 'new',
  '/profile': 'profile',
};

export default function DesktopHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<Tab>('home');

  useEffect(() => {
    const tab = reverseRouteMap[pathname as keyof typeof reverseRouteMap];
    if (tab) {
      setActiveTab(tab);
    }
  }, [pathname]);

  const handleClick = (tab: Tab) => {
    setActiveTab(tab);
    router.push(routeMap[tab]);
  };

  return (
    <nav className={styles.header}>
      {(['home', 'posts', 'new', 'profile'] as Tab[]).map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => handleClick(tab)}
        >
          {tab === 'new' ? 'Create' : tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  );
}
