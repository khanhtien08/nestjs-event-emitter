import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppDTO } from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  async createApp(@Body() createApp: AppDTO) {
    return this.appService.create(createApp);
  }
}
