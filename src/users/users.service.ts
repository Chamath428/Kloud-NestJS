import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptPassword } from 'src/util/cryptoService';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    user.password= await encryptPassword(user.password)
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
        throw new NotFoundException();
    }
    return user;
  }

  async findByEmail (email:string){
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
        throw new NotFoundException();
    }
    return user;
  }

  async update (updateUserDto:UpdateUserDto){
   const user = await this.userRepository.findOne({
    where: { id:updateUserDto.id },
    });

    if (!user) {
        throw new NotFoundException();
    }

    updateUserDto.password= await encryptPassword(updateUserDto.password)

    return await this.userRepository.save(updateUserDto)

  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return await this.userRepository.remove(user);
  }
}
