import * as dotenv from 'dotenv';
import express from 'express';
import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

dotenv.config();

const SERVER_PORT = process.env.DASHBOARD_SERVER_PORT!

const podcastsFeedsQueue = new Queue('PodcastsFeedsQueue', {
  connection: { port: +process.env.REDIS_PORT!, host: process.env.REDIS_HOST!, password: process.env.REDIS_PASSWORD! },
});

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(podcastsFeedsQueue)], // { readOnlyMode: true }
  serverAdapter: serverAdapter,
});

const app = express();

app.use('/admin/queues', serverAdapter.getRouter());

// other configurations of your server
  
app.listen(SERVER_PORT, () => {
  console.log(`Running on ${SERVER_PORT} ...`);
  console.log(`For the UI, open http://localhost:${SERVER_PORT}/admin/queues`);
  console.log(`Make sure Redis is running on port ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
});