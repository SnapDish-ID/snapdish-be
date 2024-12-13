class BadRequestError extends Error {
  code: number = 400;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends Error {
  code: number = 401;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends Error {
  code: number = 403;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends Error {
  code: number = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class UnprocessableEntityError extends Error {
  code: number = 422;

  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
  }
}

class InternalServerError extends Error {
  code: number = 500;

  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  UnprocessableEntityError,
  InternalServerError
};