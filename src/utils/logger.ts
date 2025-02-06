type LogLevel = "info" | "warn" | "error" | "debug";

export const logger = {
  info: (message: string, meta?: object) => {
    console.log(JSON.stringify({ level: "info", message, timestamp: new Date().toISOString(), ...meta }));
  },

  error: (message: string, error?: Error, meta?: object) => {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: error?.message,
        stack: error?.stack,
        timestamp: new Date().toISOString(),
        ...meta,
      })
    );
  },

  warn: (message: string, meta?: object) => {
    console.warn(JSON.stringify({ level: "warn", message, timestamp: new Date().toISOString(), ...meta }));
  },

  debug: (message: string, meta?: object) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(JSON.stringify({ level: "debug", message, timestamp: new Date().toISOString(), ...meta }));
    }
  },
};
