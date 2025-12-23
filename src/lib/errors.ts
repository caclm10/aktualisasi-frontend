type DefaultErrorFields = Record<string, string | string[] | undefined>;

class ValidationError<T = DefaultErrorFields> extends Error {
    fields: T;

    constructor(fields: T, message = "Validation failed.") {
        super(message);

        this.fields = fields;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

function isValidationError<TFields = DefaultErrorFields>(
    error: unknown,
): error is ValidationError<TFields> {
    return error instanceof ValidationError;
}

export { ValidationError, isValidationError };
