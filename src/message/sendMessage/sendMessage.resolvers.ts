import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';
import pubsub from '../../apolloPubSub';
import { NEW_MESSAGE } from '../../constant';

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: checkLogin(
      async (
        _,
        { message, userId, roomId },
        { prismaClient, loggedInUser }
      ) => {
        let room;

        if (userId) {
          const user = await prismaClient.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });

          if (!user) {
            return { isSuccess: false, error: 'User Not Found' };
          }

          room = await prismaClient.room.create({
            data: {
              users: { connect: [{ id: userId }, { id: loggedInUser.id }] },
            },
          });
        } else if (roomId) {
          room = await prismaClient.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });

          if (!room) {
            return { isSuccess: false, error: 'Room Not Found' };
          }
        }

        const createdMessage = await prismaClient.message.create({
          data: {
            room: { connect: { id: room.id } },
            user: { connect: { id: loggedInUser.id } },
            message,
          },
        });

        pubsub.publish(NEW_MESSAGE, {
          updateRoom: { ...createdMessage },
        });

        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
