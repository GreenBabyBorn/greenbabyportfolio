import { Module } from '@nestjs/common';
import { PhotoPostController } from './photo-post.controller';
import { PhotoPostService } from './photo-post.service';

@Module({
  controllers: [PhotoPostController],
  providers: [PhotoPostService]
})
export class PhotoPostModule {}
