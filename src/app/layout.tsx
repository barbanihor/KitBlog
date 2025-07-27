'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { HeaderProvider } from '@/components/HeaderProvider/HeaderProvider';
import { AuthSync } from '@/components/AuthSync/AuthSync';
import { Newsreader } from 'next/font/google';
import styles from './AppLayout.module.scss';
import '@/app/styles/globals.css';
import MobileFooter from '@/components/MobileFooter/MoblieFooter';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import DesktopHeader from '@/components/DesktopHeader/DesktopHeader';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-newsreader',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname === '/register' || pathname === '/login';

  return (
    <html lang="en" className={newsreader.variable}>
      <body>
        <div className={styles.appPage}>
          <div className={styles.appContainer}>
            <Provider store={store}>
              <AuthSync />
              <DesktopHeader />
              <HeaderProvider>
                <Toaster position="top-right" reverseOrder={false} />
                {children}
              </HeaderProvider>
              {!hideFooter && <MobileFooter />}
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
