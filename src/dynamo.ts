import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  GetItemCommandInput,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  GetItemCommandOutput,
  PutItemCommandOutput,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const TableName = "Issues";

export const findAll = async (
  input: ScanCommandInput
): Promise<ScanCommandOutput> => {
  console.log(input);
  const res = await client.send(new ScanCommand(input));
  return res;
};

export const findOne = async (
  input: GetItemCommandInput
): Promise<GetItemCommandOutput> => {
  const res = await client.send(new GetItemCommand(input));
  return res;
};

export const createOne = async (
  input: PutItemCommandInput
): Promise<PutItemCommandOutput> => {
  const res = await client.send(new PutItemCommand(input));
  return res;
};

export const deleteOne = async (
  input: DeleteItemCommandInput
): Promise<DeleteItemCommandOutput> => {
  const res = await client.send(new DeleteItemCommand(input));
  return res;
};
