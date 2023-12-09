import winston from "winston";

const options = {
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
  file: {
    level: "debug",
    filename: "logs/app.log",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
