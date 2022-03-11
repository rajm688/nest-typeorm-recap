import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TasksModule, AuthModule, PetsModule],
})
export class AppModule {}
