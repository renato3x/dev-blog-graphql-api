export class ServerError extends Error {
  constructor(
    message: string,
    public extensions: { [k: string]: unknown },
  ) {
    super(message);
  }
}
