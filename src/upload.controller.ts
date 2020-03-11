import { Controller, Get, Post, Req, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readdirSync, existsSync, mkdirSync, createReadStream } from 'fs';
import { Request } from 'express';
import { AppService } from './app.service';
import { MetadataService } from './metadata.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly metadataService: MetadataService) {}
    
    @Post(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            // Sync methods not performance optimal
            destination: function (req, file, callback) {
                let path = './files/' + req.params.id;
                !existsSync(path) && mkdirSync(path)
                callback(null, path)
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname)
            }
        })
    }))
    async uploadFile(@Param('id') userID, @UploadedFile() file) {
        this.metadataService.addFile(userID, file.originalname, file.filename);
        const response = {
            originalname: file.originalname,
            filename: file.filename
        };
        return response
    }

    @Get(':id')
    async getAllFiles(@Param('id') userID) {
       return this.metadataService.getAllFiles(userID);    
    }
}