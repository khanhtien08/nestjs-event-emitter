import { Injectable, Logger } from '@nestjs/common';
import { AppDTO } from './app.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateAppEvent, DeleteAppEvent } from "./events/app-created.event";

@Injectable()
export class AppService {
  private Users = [];
  constructor(private eventEmitter: EventEmitter2) {}
  private readonly logger = new Logger(AppService.name);
  async create(createApp: AppDTO) {
    const payload = {
      ...createApp,
    };
    this.Users.push(payload);

    const createdApp: CreateAppEvent = {
      name: payload.name,
      content: payload.content,

    };

    const deleteApp: DeleteAppEvent = {
      name: payload.name,
      content: payload.content,

    };
    this.eventEmitter.emit('app.created', createdApp);
    this.eventEmitter.emit('app.delete', deleteApp.name);

    return payload;
  }

  @OnEvent('app.*')
  listener1(payload: CreateAppEvent | DeleteAppEvent) {
    this.logger.log('Listener1: content app moi', payload.content);
  }

  @OnEvent('app.created', { async: true })
  listener2(payload: CreateAppEvent) {
    this.logger.log(
      'Listener 2: app co ten la: ',
      payload.name,
    );
  }

  @OnEvent('app.delete', { async: true })
  async listener3(payload: CreateAppEvent) {
    this.logger.log(
      'Listener 3: xoa app ....',
      payload,
    );
  }
}
