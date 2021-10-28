import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEmpty } from "class-validator";


@InputType()
export class DeleteUserInput{
 
  @Field()
  @IsEmpty()
  userId: string;

}