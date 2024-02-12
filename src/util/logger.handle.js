import winston from 'winston';


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),  // Salida en la consola
    new winston.transports.File({ filename: 'logfile.log' })  // Salida en un archivo
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

export { logger };