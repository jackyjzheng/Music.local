import { Controller, Get, Post, Req, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Controller('download')
export class DownloadController {
    constructor(private readonly metadataService: MetadataService) {}
}