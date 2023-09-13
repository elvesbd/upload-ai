import 'dotenv/config';
import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { fastifyRateLimit } from '@fastify/rate-limit'
import chalk from 'chalk';
import {
  healthCheckRoute,
  findAllPromptsRoute,
  uploadVideoRoute,
  createTranscriptionRoute,
  generateAITranscriptionRoute
} from "./routes";

const PORT = Number(process.env.PORT)
const app = fastify()
app.register(fastifyCors, { 
  origin: '*'
})

app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute'
})

app.register(healthCheckRoute)
app.register(findAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAITranscriptionRoute)

app.listen({ port: PORT }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(chalk.yellowBright(`Server is now listening on ${chalk.greenBright(address)}`));
})