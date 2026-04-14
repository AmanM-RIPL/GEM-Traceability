// import amqp from "amqplib";
import amqp, { Channel, ChannelModel } from "amqplib";

// let connection: amqp.Connection | null = null;
// let channel: amqp.Channel | null = null;
let connection: ChannelModel  | null = null;
let channel: Channel | null = null;

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://admin:admin123@localhost:5672";

export const connectRabbitMQ = async () => {
  try {
    if (channel) return;

   
    if (!connection) {
      connection = await amqp.connect(RABBITMQ_URL);
    }

    if (!connection) {
      throw new Error("Connection failed");
    }

    channel = await connection.createChannel();

    console.log("✅ Connected to Rabbitmq");
  } catch (error) {
    console.error("❌ Failed to connect to RabbitMQ", error);
  }
};

export const publishToQueue = async (queueName: string, message: any) => {
  if (!channel) {
    await connectRabbitMQ();
  }

  if (!channel) {
    console.error("Rabbitmq channel is not initialized");
    return;
  }

  console.log(queueName, "queueName");
  await channel.assertQueue(queueName, { durable: true });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

export const sendMailJobs = async (email:string,verificationToken:string) => {
  try {
    const user = {
      email: email,
      verificationToken
    };
    const message = {
      action: "sendMails",
      keys: user,
    };
    await publishToQueue("mail-validations", message);
    console.log("✅ Cache invalidation job published to Rabbitmq");
  } catch (error) {
    console.error("❌ Failed to Publish cache on Rabbitmq", error);
  }
};