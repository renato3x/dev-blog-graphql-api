import { ErrorCodes } from '@enums/error-codes.enum';
import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

export class ServerError extends GraphQLError {
  constructor(message: string, code: ErrorCodes, extensions: GraphQLErrorExtensions = {}) {
    super(message, {
      extensions: {
        code,
        ...extensions,
      },
    });
  }
}
