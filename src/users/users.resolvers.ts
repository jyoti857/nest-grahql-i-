import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/current-use.decorator";
import { GqlAuthGuard } from "../auth/guard/gql-auth.guard";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user";
import { UsersService } from "./users.service";


@Resolver(() => User)
export class UsersResolvers{
  constructor(private readonly usersService: UsersService){}

  @Query(() => User, {name: 'user', nullable: true})
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() currentUser: User, @Args() getUserArgs: GetUserArgs ): User{
    console.log("current user ---> ", currentUser);
    return this.usersService.getUser(getUserArgs);
  }
  
  @Query(() => [User], {name: 'users', nullable: 'items'})  
  @UseGuards(GqlAuthGuard)
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[]{
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('creatUserData') createUserData: CreateUserInput): User{
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput){
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput){
    return this.usersService.deleteUser(deleteUserData);
  }
}