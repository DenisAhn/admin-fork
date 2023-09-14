export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type AnyObject = Record<string, unknown>;

export type IntervalType = ReturnType<typeof setInterval>;
