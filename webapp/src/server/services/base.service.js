import request from 'request';
import { GET, POST, PUT, DELETE } from '../util/app.constants';
class BaseService {
    constructor() {
        this.headers = {
            "content-type": "application/json"
        };
    }
    httpGetWithStatusCode(url, header) {
        this.buildHeaders(header);
        return this.callToGetWithStatusCode(url, GET, this.headers);
    }
    httpGet(url, header) {
        this.buildHeaders(header);
        return this.call(url, GET, this.headers);
    }
    httpPost(url, header, data) {
        this.buildHeaders(header);
        return this.call(url, POST, this.headers, data);
    }
    httpPut(url, header, data) {
        this.buildHeaders(header);
        return this.call(url, PUT, this.headers, data);
    }
    httpDelete(url, header) {
        this.buildHeaders(header);
        return this.call(url, DELETE, this.headers);
    }
    buildHeaders(header) {
        if (header) {
            if (!this.headers) {
                this.headers = {};
            }
            let keys = Object.keys(header);
            if (keys) {
                keys.forEach(key => {
                    this.headers[key] = header[key];
                });
            }
        }
    }
    call(url, method, header, data) {
        let options = {
            url: url,
            method: method,
            body: JSON.stringify(data),
            headers: header
        };
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (err) {
                    console.log(`ERROR in base.service.js - Line-58 : ${err}`);
                    reject(err);
                }
                else if ((response.statusCode !== 200) && (response.statusCode !== 201) && (response.statusCode !== 204)) {
                    resolve({ code: response.statusCode, message: JSON.stringify(response.body) });
                }
                else {
                    body ? resolve({ code: response.statusCode, message: JSON.parse(body) }) : resolve({ statusCode: response.statusCode, message: body });
                }
            });
        });
    }
    callToGetWithStatusCode(url, method, header, data) {
        let options = {
            url: url,
            method: method,
            headers: header
        };
        if (data) {
            options['body'] = JSON.stringify(data);
        }
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                try {
                    if (err) {
                        console.log(`ERROR in base.service.js - Line-82 : ${err}`);
                        resolve(response);
                    }
                    else {
                        body ? resolve({ code: response.statusCode, data: JSON.parse(body) }) : resolve({ code: response.statusCode, data: body });
                    }
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
};

const api = async (options) => new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
        if (body && body.error) {
            reject(body.error);
        }
        resolve(body);
    })
});

export { BaseService, api };
