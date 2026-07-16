export class AppError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}