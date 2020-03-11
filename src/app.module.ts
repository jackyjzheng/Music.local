import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MetadataService } from './metadata.service';

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  controllers: [AppController, UploadController],
  providers: [AppService, MetadataService],
})
export class AppModule {}
