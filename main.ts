import AWS from "aws-sdk";

function getEnvOrAsk(
  name: string,
  displayName: string,
  required: boolean = true
) {
  const value = Deno.env.get(name) || prompt(`Enter your ${displayName}:`);

  if (!value && required) throw new Error(`${displayName} is required`);

  return value || undefined;
}

const accessKeyId = getEnvOrAsk("AWS_ACCESS_KEY_ID", "AWS access key ID");
const secretAccessKey = getEnvOrAsk(
  "AWS_SECRET_ACCESS_KEY",
  "AWS secret access key"
);
const region = getEnvOrAsk("AWS_REGION", "AWS region");

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

async function getS3Client() {
  const s3 = new AWS.S3();

  try {
    await s3.listBuckets().promise();
    console.log("Successfully connected to AWS S3.");
    return s3;
  } catch (error: any) {
    console.error("Failed to connect to AWS:", error.message);
    return null;
  }
}

(async () => {
  const s3 = await getS3Client();
})();
