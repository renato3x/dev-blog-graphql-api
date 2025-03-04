import request from 'supertest';

export type QueryOptions = {
  query: string;
  variables?: {
    [key: string]: any;
  };
};

export type GraphQLError = {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: Record<string, any>;
};

export type QueryResponse<T = any> = {
  data?: T;
  errors?: GraphQLError[];
  extensions?: Record<string, any>;
};

export class Client {
  private static url: string;

  static setUrl(url: string): void {
    this.url = url;
  }

  static async query<T = any>(options: QueryOptions): Promise<QueryResponse<T>> {
    if (!this.url) {
      throw new Error('Url is not defined');
    }

    return await request(this.url)
      .post('/')
      .send(options)
      .then((response) => response.body as QueryResponse<T>);
  }
}
