import * as React from 'react';

export interface ToggleState {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useToggleState = (initialState = false): ToggleState => {
  const [opened, setOpened] = React.useState(initialState);

  const open = React.useCallback(() => setOpened(true), []);

  const close = React.useCallback(() => setOpened(false), []);

  const toggle = React.useCallback(() => setOpened((o) => !o), []);

  return {
    opened,
    open,
    close,
    toggle,
  };
};

export default useToggleState;
