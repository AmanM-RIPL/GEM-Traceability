// import amqp from "amqplib";
import amqp, { Channel, ChannelModel } from "amqplib";
let channel: Channel | null = null;

export const QUEUES = {
  MAIN: "mail-validations",
  RETRY: "mail-validations-retry",
  ERROR: "mail-validations-error",
};

export const connectRabbitMQ = async () => {
  try {
    if (channel) return;
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.Rabbimq_Host,
      port: 5672,
      username: process.env.Rabbimq_Username,
      password: process.env.Rabbimq_Password,
    });

    // if (!connection) {
    //   connection = await amqp.connect(RABBITMQ_URL);
    // }

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

export const sendMailJobs = async (email: string, verificationToken: string) => {
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