import { sendVerificationEmail } from "@/lib/nodemailmer/email";
import amqp from "amqplib";
interface SendMailMessage {
  action: "sendMails";
  email: string;
  verificationToken: string;

}
interface CacheInvalidationMessage {
  action: string;
  keys: SendMailMessage;
}

export const startCacheConsumer = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.Rabbimq_Host,
      port: 5672,
      username: process.env.Rabbimq_Username,
      password: process.env.Rabbimq_Password,
    });
    // const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
    const channel = await connection.createChannel();
    const queueName = "mail-validations";
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
      console.log(msg, "nsnjnsaj");
      if (msg) {
        try {
          const content = JSON.parse(
            msg.content.toString()
          ) as CacheInvalidationMessage;

          console.log(
            "📩 invalidation message",
            content
          );
          if (content.action === "sendMails") {
            const { email, verificationToken } = content.keys;

            await sendVerificationEmail(email, verificationToken);
          }

          channel.ack(msg);
        } catch (error) {
          console.error(
            "❌ Error processing cache invalidation in blog service:",
            error
          );

          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error("❌ Failed to start rabbitmq consumer");
  }
};