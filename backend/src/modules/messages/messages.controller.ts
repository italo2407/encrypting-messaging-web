import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageRequest } from './request/messages.request';
import { Messages } from 'src/domain/entities/messages';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get(':receiverId')
  async getMessagesByReceiverId(@Param('receiverId') receiverId: string) {
    return this.messageService.getMessagesByReceiverId(receiverId);
  }

  @Post('send')
  async sendMessage(@Body() body: MessageRequest) {
    const message = new Messages({
      title: body.title,
      senderId: body.senderId,
    });

    return this.messageService.send(message, body.content, body.receiverEmail);
  }

  @Put(':messageId/markAsRead')
  async markAsRead(@Param('messageId') messageId: string) {
    return this.messageService.markAsRead(messageId);
  }
}
