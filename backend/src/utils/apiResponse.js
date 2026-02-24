// Standard API success response
export const successResponse = (res, data = null, message = "Success", statusCode = 200) => {
    const response = {
        success: true,
        message,
    };
    if (data !== null) response.data = data;
    return res.status(statusCode).json(response);
};

// Standard API error response
export const errorResponse = (res, message = "Something went wrong", statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
