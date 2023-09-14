import { configure } from 'mobx';

export const initMobX = (): void =>
  configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    useProxies: 'always',
  });
