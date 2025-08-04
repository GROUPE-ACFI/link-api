import { NestFactory } from '@nestjs/core';
import { PartnerSeedModule } from './partner-seed.module';
import { PartnerSeedService } from './partner-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(PartnerSeedModule);
  await app.get(PartnerSeedService).run();
  await app.close();
};

void runSeed();
