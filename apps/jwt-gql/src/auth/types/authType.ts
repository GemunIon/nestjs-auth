import { Field, ObjectType } from "@nestjs/graphql";

import { IJwt } from "../interfaces";

@ObjectType()
export class AuthType implements IJwt {
  @Field()
  public accessToken: string;

  @Field()
  public refreshToken: string;

  @Field()
  public accessTokenExpiresAt: number;

  @Field()
  public refreshTokenExpiresAt: number;
}
