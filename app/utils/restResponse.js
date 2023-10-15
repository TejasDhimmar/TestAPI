exports.success = (dataGet = {}, msg) => {
    let data = {}
    data.success = true;
    data.data = dataGet;
    data.message = msg;
    data.errors = {};
    data.code = 200;
    return data;
};

exports.error = (dataGet, msg = "Error!", statusCode, dataResponse = {}) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    if (typeof dataGet == 'string') {
        msg = dataGet;
    } else {
        msg = dataGet.join(',');
    }
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
    let data = {}
    data.success = false;
    data.data = dataResponse;
    data.message = msg;
    data.errors = dataGet;
    data.code = statusCode;
    return data;
};

exports.validation = (errors, dataResponse = []) => {
    let msg = 'Validation errors';
    if (typeof errors == 'string') {
        msg = errors;
    } else {
        msg = errors.join(',');
    }
    return {
        success: false,
        // error: true,
        code: 422,
        message: msg,
        errors,
        data: dataResponse
    };
};