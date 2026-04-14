// export const checkEnvironment = async () => {
//   if (process.env.ENVIRONMENT == "development") {
//     console.log("🚫 Email disabled via env");
//     return true;
//   }
//     return false;

//   // send email
// };

// config/env.ts
export const ENV = {
  isDev: process.env.ENVIRONMENT === "development",
  isProd: process.env.ENVIRONMENT === "production",
  isTest: process.env.ENVIRONMENT === "test",
};