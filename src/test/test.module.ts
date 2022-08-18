import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TestService } from './test.service';

@Module({
  imports: [PrismaModule],
  providers: [TestService],
})
export class TestModule {}
