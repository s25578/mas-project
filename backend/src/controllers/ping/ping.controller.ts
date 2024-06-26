import {Controller, Get} from '@nestjs/common';

@Controller('ping')
export class PingController {
    @Get()
    getCurrentTime(): { serverTime: string } {
        const serverTime = new Date().toISOString();
        return { serverTime };
    }
}