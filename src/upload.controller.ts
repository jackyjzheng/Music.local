import { Controller, Get, Post, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }

    @Get()
    findAll(@Req() userRequest: Request): string {
        return 'Get request';
    }
}