export const getError = (ex: unknown): string => {
  if (ex instanceof Error) {
    return ex.message;
  }
  return "An unexpected error occurred";
};

export const throwError = async (res: Response) => {
  const msg = await res.text();
  throw new Error(msg);
};
