// Librarys
import { ConfigModule } from '@nestjs/config';

// Enable environment variables
export const UseEnvironmentVariables = ConfigModule.forRoot({
  cache      : true,
  isGlobal   : true,
  envFilePath: ['.env'],
});