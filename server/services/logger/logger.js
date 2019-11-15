const winston = require('winston');

const { combine, timestamp, label, printf } = winston.format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;    // log 출력 포맷 정의
});
 
const options = {
  // log파일
  // file: {
  //   level: 'info',
  //   filename: `${appRoot}/logs/winston-test.log`, // 로그파일을 남길 경로
  //   handleExceptions: true,
  //   json: false,
  //   maxsize: 5242880, // 5MB
  //   maxFiles: 5,
  //   colorize: false,
  //   format: combine(
  //     label({ label: 'winston-test' }),
  //     timestamp(),
  //     myFormat    // log 출력 포맷
  //   )
  // },
  // console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    colorize: true,
    format: combine(
      // label({ label: 'nba_express' }),
      timestamp(),
      myFormat
    )
  }
}


const logger = winston.createLogger({
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
    new winston.transports.Console(options.console),
  ]
});

module.exports = logger;