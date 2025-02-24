import { GraphQLFormattedError } from 'graphql';

export function formatError(error: GraphQLFormattedError): GraphQLFormattedError {
  if (error.extensions?.stacktrace) {
    delete error.extensions.stacktrace;
  }

  return {
    message: error.message,
    extensions: error.extensions,
  };
}
