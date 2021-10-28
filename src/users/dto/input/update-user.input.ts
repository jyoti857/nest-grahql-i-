import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsEmpty, IsOptional } from "class-validator";


@InputType()
export class UpdateUserInput{
  @Field()
  @IsEmpty()
  userId: string;
  
  @Field()
  @IsOptional()
  @IsEmpty()
  age?: number;

  @Field(() => Int, {nullable: true })
  @IsOptional()
  isSubscribed?: boolean;
}