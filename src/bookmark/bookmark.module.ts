import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.contorller';
import { BookMarkService } from './bookmark.service';

@Module({
    controllers:[BookmarkController],
    providers:[BookMarkService]
})
export class BookmarkModule {}
