import { createTransport, Transporter } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import env from '~/env';

class MailClient {
  private static instance: Transporter | undefined = undefined;

  private constructor() {}

  public static getInstance(): Transporter {
    if (!MailClient.instance) {
      MailClient.instance = createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURED,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      });
    }
    return MailClient.instance;
  }
}

export async function sendMail(
  to: string[],
  subject: string,
  body: string,
  attachments: Attachment[] = []
) {
  const client = MailClient.getInstance();
  return await client.sendMail({
    from: env.SMTP_USER,
    to,
    subject,
    html: body,
    attachments,
  });
}
