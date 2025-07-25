'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { HeaderProvider } from '@/components/HeaderProvider/HeaderProvider';
import { AuthSync } from '@/components/AuthSync/AuthSync';
import { Newsreader } from 'next/font/google';
import styles from './AppLayout.module.scss';
import '@/app/styles/globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-newsreader',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body>
        <div className={styles.appPage}>
          <div className={styles.appContainer}>
            <Provider store={store}>
              <AuthSync />
              <HeaderProvider>{children}</HeaderProvider>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
