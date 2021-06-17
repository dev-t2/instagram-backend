import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();

export default pubsub;

export const NEW_MESSAGE = 'NEW_MESSAGE';
