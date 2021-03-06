import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength, IsEnum } from "class-validator";

import { IUserCreateDto, UserRole } from "../interfaces";

@InputType()
export class UserCreateInputType implements IUserCreateDto {
  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @MinLength(6)
  public password: string;

  @Field(_type => [UserRole])
  @IsEnum(UserRole, { each: true })
  public roles: Array<UserRole>;
}
