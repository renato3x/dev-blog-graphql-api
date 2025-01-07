import { HelloWorld } from '@schemas/hello-world.schema';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver(HelloWorld)
export class HelloWorldResolver {
  @Query(() => HelloWorld)
  hello(
    @Arg('message', () => String, { nullable: true }) message: string
  ): HelloWorld {
    return {
      message: message || 'Hello World!',
    };
  }
}
