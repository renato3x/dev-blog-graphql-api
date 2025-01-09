export class ServerError extends Error {
  constructor(
    message: string,
    public extensions: { [k: string]: any },
  ) {
    super(message);
  }
}
