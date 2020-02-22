import { Controller, Get, Post, Req, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('upload')
export class UploadController {
    @Post(':id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('id') userID, @UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename
        };
        return response    
    }

    @Get(':filepath')
    getUploadedFile(@Param('filepath') musicFile, @Res() res) {
        return res.sendFile(musicFile, { root: './files' });
    }
}