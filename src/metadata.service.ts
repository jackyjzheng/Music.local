import * as Redis from 'ioredis';
import { Controller, Get, Post, Req, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { Injectable } from "@nestjs/common";

@Injectable()
export class MetadataService {
    // Maps userID to map of their filename -> file metadata
    private db = new Redis();

    async addFile(userID: string, filename: string, filedata: string) {
        this.db.hset(userID, filename, filedata);
    }

    getAllFiles(userID) {
        return this.db.hgetall(userID)
    }
}