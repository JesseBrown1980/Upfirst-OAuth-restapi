export const config = {
  server: {
    port: process.env.PORT || 8080,
    bodyLimit: "10mb",
  },
  oauth: {
    clientId: process.env.CLIENT_ID || "upfirst",
    redirectUri: process.env.REDIRECT_URI || "http://localhost:8081/process",
    tokenExpiry: Number(process.env.TOKEN_EXPIRES_IN) || 3600,
    authCodeExpiry: 600000, // 10 minutes in milliseconds
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
