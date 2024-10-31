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
    // Test the connection
    await s3.listBuckets().promise();

    console.log("Successfully connected to AWS S3.");

    return s3;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to connect to AWS:", error.message);
    } else {
      console.error("Failed to connect to AWS.", error);
    }

    return null;
  }
}

async function listBuckets(s3: AWS.S3): Promise<void> {
  try {
    const data = await s3.listBuckets().promise();
    const buckets = data.Buckets || [];

    if (buckets.length === 0) {
      console.log("No buckets found.");
      return;
    }

    console.log(`Buckets [${buckets.length}]:`);
    for (const bucket of buckets) {
      console.log(`  - ${bucket.Name}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to list buckets:", error.message);
    } else {
      console.error("Failed to list buckets:", error);
    }
  }
}

(async () => {
  const s3 = await getS3Client();
  if (!s3) return;

  await listBuckets(s3);
})();
