import * as aws from 'aws-sdk';

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadToS3 = async (folder, file) => {
  const { filename, createReadStream } = await file;
  const uploadFileName = `${folder}/${Date.now()}_${filename}`;
  const readStream = createReadStream();

  const { Location } = await new aws.S3()
    .upload({
      Bucket: process.env.BUCKET,
      Key: uploadFileName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();

  return Location;
};
