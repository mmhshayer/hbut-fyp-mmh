export const trimValues = (values: any) => {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, (value as any).trim()])
  );
};
