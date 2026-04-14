
import { connectRabbitMQ } from "@/lib/queue";
import { startCacheConsumer } from "./consumer";


const bootstrap = async () => {
  try {
    await connectRabbitMQ();
    await startCacheConsumer();

    console.log("🚀 Worker started successfully");
  } catch (error) {
    console.error("❌ Worker bootstrap failed:", error);
  }
};

bootstrap();