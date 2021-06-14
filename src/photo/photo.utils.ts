export const parseHashTags = (caption: string) => {
  if (caption) {
    const matchedHashTags = caption.match(/#[\w]+/g);

    if (matchedHashTags) {
      return {
        connectOrCreate: matchedHashTags.map(hashTag => ({
          where: { hashTag },
          create: { hashTag },
        })),
      };
    }

    return undefined;
  }

  return undefined;
};
