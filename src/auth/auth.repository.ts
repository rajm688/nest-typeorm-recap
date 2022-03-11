//repository are class decorated with @EntityRepository which extends Repostiory from typeorm and gives the type of the entity the repository tends to

import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { userDto } from './dto/auth.dto';
import { payloadInterface } from './dto/payload.interface';
@EntityRepository(User) // to denote the repository of the Auth entity
export class AuthRepository extends Repository<User> {
  async creatingUser(req: userDto): Promise<{}> {
    try {
      const { username, password } = req;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values({ username, password: hashedPassword })
        .execute();
      return { mes: 'user created successfully' };
    } catch (error) {
      //   console.log(error.code);
      if (error.code == 23505) return { mes: 'user already exists' };
      else return { mes: 'error in signup' };
    }
  }
  async finduser(req: userDto, jwtService): Promise<{}> {
    try {
      const { username, password } = req;
      const user = await this.createQueryBuilder().where({ username }).getOne();
      const unhashedpassword = await bcrypt.compare(password, user.password);
      if (user && unhashedpassword) {
        const payload: payloadInterface = { username }; //payload should be an object
        const accessToken = await jwtService.sign(payload);
        return { accessToken }; // common prctice is to sent token in obj
      } else return { mes: 'invaid username or password' };
    } catch (err) {
      return { mes: 'error in login' };
    }
  }
}
