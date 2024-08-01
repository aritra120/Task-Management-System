class Response {
    status = '';
    statusCode = null;
    info = {};

    constructor(responseInfo={}) {
        this.status = responseInfo.status === 200 ? 'success' : 'failed' ;
        this.statusCode = responseInfo.status || 400;
        this.info = responseInfo.data || {};
    }

    getStatus() {
        return this.status;
    }

    getStatusCode() {
        return this.statusCode;
    }

    getInfo() {
        return this.info;
    }

    setStatus(status) {
        this.status = status;
    }

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
    }

    setInfo(data) {
        this.info = data;
    }
}

module.exports = Response;

