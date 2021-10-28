import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEmpty } from "class-validator";


@InputType()
export class CreateUserInput{
  @Field()
  @IsEmail()
  @IsEmpty()
  email: string;
  
  @Field()
  @IsEmpty()
  age: number;
}