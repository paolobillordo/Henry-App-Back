const {createLogger, format, transports} = require('winston');


module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 51200000,
            maxFiles: 15,
            filename: `${__dirname}/src/logs/logs_api.log`
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})