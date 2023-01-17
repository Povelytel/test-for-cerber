import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('balance/:token_contract_addr/:user_addr')
  getTokenBalance(@Param() params) {
    const { token_contract_addr, user_addr } = params;

    if (token_contract_addr && user_addr) {
      return this.appService.getTokenBalance(token_contract_addr, user_addr);
    }
    return new Error('params incorrect');
  }

  @Get('balance-eth/:user_addr')
  getBalance(@Param() params) {
    const { user_addr } = params;

    if (user_addr) return this.appService.getBalance(user_addr);

    return new Error('params incorrect');
  }

  @Post('send-token')
  sendToken(@Body() body, @Headers() headers) {
    const { token_addr, user_addr, recipient_addr, amount } = body;
    const { authorization: auth } = headers;

    const [scheme, private_key] = auth.split(' ');

    if (private_key && token_addr && user_addr && recipient_addr && amount)
      return this.appService.sendToken(
        token_addr,
        user_addr,
        private_key,
        recipient_addr,
        amount,
      );

    return 'params incorrect';
  }

  @Get('generate-address')
  generateAddress() {
    return this.appService.generateAddress();
  }
}
