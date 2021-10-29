import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/input/create-user.input";
import { User } from "./models/user";
import { v4 as uuid}from 'uuid'
import { UpdateUserInput } from "./dto/input/update-user.input";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { DeleteUserInput } from "./dto/input/delete-user.input";
@Injectable() 
export class UsersService{
  private users: User[] = [
    {
      age: 32,
      email: 'a@gmail.com',
      userId: "199bf90e-c409-42fc-9365-6a6759d0ef81", //uuid(),
      isSubscribed: false,
      password: "123"
    }
  ];

  public createUser(createUserData: CreateUserInput): User{
    const user: User  = {
      userId: uuid(),
      ...createUserData
    }
    this.users.unshift(user);
    return user;
  }

  public getUser(getUser: GetUserArgs): User{
    return this.users.find(u => u.userId === getUser.userId);
  }

  // get user by email, is required because for login purpose 
  public getUserByEmail(email: string): User{
    return this.users.find(u => u.email = email);
  }
  public getUsers(getUsers: GetUsersArgs): User[]{
    return getUsers.userIds.map(userId => this.getUser({userId}))
  }
  public updateUser(updateUserData: UpdateUserInput): User{
    // const userIndex = this.users.findIndex(u => u.userId === updateUserData.userId);
    const user = this.users.find(u => u.userId === updateUserData.userId);
    return Object.assign(user, updateUserData)
    // return {...this.users[userIndex], ...updateUserData}
  }
  public deleteUser(deleteUserData: DeleteUserInput): User{
    const userIndex = this.users.findIndex(u => deleteUserData.userId);
    this.users.splice(userIndex);
    return this.users[userIndex];
  }
}