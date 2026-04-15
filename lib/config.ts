// export const checkEnvironment = async () => {
//   if (process.env.ENVIRONMENT == "development") {
//     console.log("🚫 Email disabled via env");
//     return true;
//   }
//     return false;

//   // send email
// };

// config/env.ts
const getEnv = (key: string): string => {
  const value = process.env[key];
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