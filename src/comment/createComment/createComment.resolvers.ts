import { Resolvers } from '../../types';
import { checkLogin } from '../../user/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createComment: checkLogin(
      async (_, { photoId, comment }, { prismaClient, loggedInUser }) => {
        try {
          const photo = await prismaClient.photo.findUnique({
            where: { id: photoId },
            select: { id: true },
          });

          if (!photo) {
            return { isSuccess: false, error: '사진을 찾을 수 없습니다.' };
          }

          const createdComment = await prismaClient.comment.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              photo: { connect: { id: photoId } },
              comment,
            },
            include: {
              user: {
                select: {
                  nickname: true,
                  avatar: true,
                },
              },
            },
          });

          return { isSuccess: true, createdComment };
        } catch (error) {
          return {
            isSuccess: false,
            error: '서버 에러가 발생했습니다. 관리자에게 문의하세요.',
          };
        }
      }
    ),
  },
};

export default resolvers;
