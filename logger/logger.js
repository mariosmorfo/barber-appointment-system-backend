require('winston-daily-rotate-file')
require('winston-mongodb')

const {format, createLogger, transports} = require('winston')
const {combine, timestamp, label} = format
const CATEGORY = "Users app logs"

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "7d",
  level: "info"
})

const logger = createLogger({
  format: combine(
    label({label: 'MY LABEL FOR BARBERS APP'}),
    timestamp({format: 'DD-MM-YYYY HH:mm:sss'}),
    format.json()
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      level: "warn",
      filename: "logs/warn.log"
    }),
    fileRotateTransport,
    new transports.File({
      level: "info",
      filename: "logs/info.log"
    }),
    fileRotateTransport,
    new transports.File({
      level: "error",
      filename: "logs/error.log"
    }),
    new transports.MongoDB({
      level: "info",
      db: process.env.MongoDB_URI,
      collection: "server_logs",
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
 
})

module.exports = logger