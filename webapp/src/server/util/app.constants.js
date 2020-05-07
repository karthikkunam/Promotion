import { loadConfig } from '../../../config/config';
loadConfig();

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PRODUCTION = 'production';
const STOREOFFERS_SERVICE_URI = process.env.STOREOFFERS_SERVICE_URI;
const STOREOFFERDETAILS_SERVICE_URI = process.env.STOREOFFERDETAILS_SERVICE_URI;
const ITEM_SERVICE_URI= process.env.ITEM_SERVICE_URI;
const UPDATEOFFER_SERVICE_URI = process.env.UPDATEOFFER_SERVICE_URI;
const AUTH_SERVICE_URI = process.env.AUTH_SERVICE_URI;
const X_API_KEY= process.env.X_API_KEY;

const TRACING_CONSTANTS = {
    TRACE_ID_KEY: 'traceId',
    TRACE_ID: ' '
};

const ENTER_METHOD = 'Entering the method: ';
const Exit_METHOD = 'Exiting the method: ';
const ERROR_METHOD = 'Exception occured in ';

const EXPIRATION_TIME_FOR_REDIS = 1 * 86400 + 0 * 3600 + 0 * 60 + 0;   //Number of DAYS + HOURS + MINUTES + SECONDS

// Http StatusCode
const HTTP_STATUS_CODE_200 = 200;
const HTTP_STATUS_CODE_400 = 400;
const HTTP_STATUS_CODE_404 = 404;
const HTTP_STATUS_CODE_500 = 500;

// Http Header
const HTTP_HEADER_ACCEPT = 'Accept';
const HTTP_HEADER_ACCEPT_JSON = 'application/json';

const BEARER = 'Bearer';
const STORE_ID_LENGTH = 5
const NUMBER_REG_EX = /^\d+$/;

const MOMENT_TIME_ZONES_CODES = {
    UTC: 'UTC',
    CST: 'America/Chicago',
    PST: 'America/Los_Angeles',
    EST: 'America/New_York',
    MST: 'America/Phoenix',
};

const convertTimeZoneToMatchMoment = (timezone) => {
    let finalTimeZone;
    if ((timezone).toUpperCase() === 'C' || (timezone).toUpperCase() === 'CST' || (timezone).toUpperCase() === 'CDT' || (timezone).toUpperCase() === 'CT') {
        finalTimeZone = MOMENT_TIME_ZONES_CODES.CST;
    } else if ((timezone).toUpperCase() === 'E' || (timezone).toUpperCase() === 'EST' || (timezone).toUpperCase() === 'EDT' || (timezone).toUpperCase() === 'ET') {
        finalTimeZone = MOMENT_TIME_ZONES_CODES.EST;
    } else if ((timezone).toUpperCase() === 'P' || (timezone).toUpperCase() === 'PST' || (timezone).toUpperCase() === 'PDT' || (timezone).toUpperCase() === 'PT') {
        finalTimeZone = MOMENT_TIME_ZONES_CODES.PST;
    } else if ((timezone).toUpperCase() === 'M' || (timezone).toUpperCase() === 'MST' || (timezone).toUpperCase() === 'MDT' || (timezone).toUpperCase() === 'MT') {
        finalTimeZone = MOMENT_TIME_ZONES_CODES.MST;
    } else {
        finalTimeZone = timezone;
    }
    return finalTimeZone;
}

export {
    PRODUCTION,
    STOREOFFERS_SERVICE_URI,
    STOREOFFERDETAILS_SERVICE_URI,
    ITEM_SERVICE_URI,
    UPDATEOFFER_SERVICE_URI,
    AUTH_SERVICE_URI,
    X_API_KEY,
    ENTER_METHOD,
    Exit_METHOD,
    ERROR_METHOD,
    convertTimeZoneToMatchMoment,
    GET,
    POST,
    PUT,
    DELETE,
    HTTP_STATUS_CODE_200,
    HTTP_STATUS_CODE_400,
    HTTP_STATUS_CODE_404,
    HTTP_STATUS_CODE_500,
    HTTP_HEADER_ACCEPT_JSON,
    HTTP_HEADER_ACCEPT,
    BEARER,
    STORE_ID_LENGTH,
    NUMBER_REG_EX,
    EXPIRATION_TIME_FOR_REDIS,
    TRACING_CONSTANTS
}
