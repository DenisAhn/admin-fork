export const normalizeStringValue = <T>(value?: T): string => {
  return String(value ?? '') || '';
};
