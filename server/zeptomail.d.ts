declare module 'zeptomail' {
  export interface EmailAddress {
    address: string;
    name?: string;
  }

  export interface EmailRecipient {
    email_address: EmailAddress;
  }

  export interface SendMailOptions {
    from: EmailAddress;
    to: EmailRecipient[];
    reply_to?: EmailAddress[];
    subject: string;
    textbody?: string;
    htmlbody?: string;
    track_clicks?: boolean;
    track_opens?: boolean;
    attachments?: any[];
  }

  export class SendMailClient {
    constructor(config: { url: string; token: string });
    sendMail(options: SendMailOptions): Promise<any>;
    sendBatchMail(options: any): Promise<any>;
    sendMailWithTemplate(options: any): Promise<any>;
  }
}
