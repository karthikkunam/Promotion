const os = require("os");

let correlationId = null;

const { Logger } = require('@7eleven/7boss-logger');
const metaData = {
    team: 'ris2.0',
    cached: false,
    correlationId: correlationId
};
const loggerConfig = {
    environment: 'dev',
    kinesisStream: 'prod-7LogsKinesisStream',
    writerRoleArn: 'arn:aws:iam::774047977279:role/app-7logs-master-infrastructure-pr-7LogsWriterRole-ONZ60NU7KSMV',
    applicationName: 'RIS2.0',
    originator: os.hostname(),
    setDefaultLogger: true,
    logLevel: null,
    logConfigLevels: null,
    debugLogs: false,
    consoleLogs: true,
};
console.log('originator',os.hostname)

// Initialize
const initialize = async () => {
    try {
        Logger.initialize(
            loggerConfig.environment,
            loggerConfig.kinesisStream,
            loggerConfig.writerRoleArn,
            loggerConfig.applicationName,
            loggerConfig.originator,
            loggerConfig.setDefaultLogger,
            metaData,
            loggerConfig.logLevel,
            loggerConfig.logConfigLevels,
            loggerConfig.debugLogs,
            loggerConfig.consoleLogs,
        );
        global.log = Logger.getLoggerInstance(loggerConfig.applicationName);
        log.debug('Logger initialized');
        return "Successfully initialized";
    } catch (error) {
        log.error(error, 'Error initializing logger');
        return Promise.reject(error);
    }
};
 

// Primary entry point
async function LogActivity(message,myObj) { 
    try { 
        // Create unique id for run 
        correlationId = "c9d9ac7a-3560-4558-8c83-4a20b89035a8"; 
 
        // Initialize container 
        await initialize(); 
       
      
        log.info(message, myObj);
       
        // Flush & return 
        await Logger.flushLogs();
    } catch (error) { 
        //logger.error("Caught unhandled error, flushing logs: ", error); 
        console.log(error);
        // Flush & return 
        await Logger.flushLogs();
    } 
} 

module.exports = {
    LogActivity  
};