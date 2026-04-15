const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build") {
    return "placeholder";
  }
  if (!value) {
    throw new Error(`${key} is missing`);
  }
  return value;
};

export const env = {
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
};

export const ENV = {
  isDev: process.env.ENVIRONMENT === "development",
  isProd: process.env.ENVIRONMENT === "production",
  isTest: process.env.ENVIRONMENT === "test",
};
