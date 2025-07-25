'use client';

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import styles from './HeaderProvider.module.scss';

type ButtonPosition = 'buttonLeft' | 'buttonRight';

interface HeaderContextProps {
  title: string;
  button: ReactNode;
  buttonPosition: ButtonPosition;
  setHeader: (title: string, buttons: ReactNode, buttonPosition: ButtonPosition) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error('useHeader must be used within HeaderProvider');
  return context;
}

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('Default Title');
  const [button, setButtons] = useState<ReactNode>(null);
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>('buttonLeft');

  const setHeader = useCallback(
    (newTitle: string, newButtons: ReactNode, newButtonPosition: ButtonPosition) => {
      setTitle(newTitle);
      setButtons(newButtons);
      setButtonPosition(newButtonPosition);
    },
    []
  );

  return (
    <HeaderContext.Provider value={{ title, button, buttonPosition, setHeader }}>
      <header className={styles.header}>
        <div className={styles.left}>
          {buttonPosition === 'buttonLeft' ? button : null}
        </div>

        <div className={styles.center}>
          <h3>{title}</h3>
        </div>

        <div className={styles.right}>
          {buttonPosition === 'buttonRight' ? button : null}
        </div>
      </header>
      <main>{children}</main>
    </HeaderContext.Provider>
  );
}
