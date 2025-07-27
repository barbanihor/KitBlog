'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './MobileFooter.module.scss';

type Tab = 'home' | 'posts' | 'new' | 'profile';

interface FooterProps {
  onChangeTab?: (tab: Tab) => void;
  initialTab?: Tab;
}

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

export default function MobileFooter({ initialTab = 'home' }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

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
    <nav className={styles.footer}>
      <button
        className={`${styles.tab} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => handleClick('home')}
        aria-label="Home"
      >
        <img
          className={styles.footerIcon}
          src={
            activeTab === 'home'
              ? '/icons/footer/homeActive.svg'
              : '/icons/footer/home.svg'
          }
          alt="home"
        />
        <span>Home</span>
      </button>

      <button
        className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
        onClick={() => handleClick('posts')}
        aria-label="Posts"
      >
        <img
          className={styles.footerIcon}
          src={
            activeTab === 'posts'
              ? '/icons/footer/postsActive.svg'
              : '/icons/footer/posts.svg'
          }
          alt="posts"
        />
        <span>Posts</span>
      </button>

      <button
        className={`${styles.tab} ${activeTab === 'new' ? styles.active : ''}`}
        onClick={() => handleClick('new')}
        aria-label="Create"
      >
        <img
          className={styles.footerIcon}
          src={
            activeTab === 'new'
              ? '/icons/footer/plusActive.svg'
              : '/icons/footer/plus.svg'
          }
          alt="create"
        />
        <span>Create</span>
      </button>

      <button
        className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
        onClick={() => handleClick('profile')}
        aria-label="Profile"
      >
        <img
          className={styles.footerIcon}
          src={
            activeTab === 'profile'
              ? '/icons/footer/userActive.svg'
              : '/icons/footer/user.svg'
          }
          alt="user"
        />
        <span>Profile</span>
      </button>
    </nav>
  );
}
