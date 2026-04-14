
import { sendVerificationEmail } from "@/lib/nodemailmer/email";
import amqp from "amqplib";

interface CacheInvalidationMessage {
  action: string;
  keys: string[];
}

export const startCacheConsumer = async () => {
  try {
    // const connection = await amqp.connect({
    //   protocol: "amqp",
    //   hostname: process.env.Rabbimq_Host,
    //   port: 5672,
    //   username: process.env.Rabbimq_Username,
    //   password: process.env.Rabbimq_Password,
    // });
    const connection = await amqp.connect("amqp://admin:admin123@localhost:5672");
    const channel = await connection.createChannel();
    const queueName = "mail-validations";
    await channel.assertQueue(queueName, { durable: true });
    console.log(queueName);
    channel.consume(queueName, async (msg) => {
        console.log(msg,"msssdf");
      if (msg) {
        try {
          const content = JSON.parse(
            msg.content.toString()
          ) as CacheInvalidationMessage;

          console.log(
            "📩 Blog service recieved cache invalidation message",
            content
          );
          console.log("sendMails",content,"39");
          if (content.action === "sendMails") {
           
        sendVerificationEmail("nish.mehta10@gmail.com","123335");
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