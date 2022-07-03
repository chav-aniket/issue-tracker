import { v4 as uuidv4 } from "uuid";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import * as dynamo from "./dynamo";
import { Resolvers, Issue, Status, MoveResponse } from "./generated/gql";
import { invalidGetError } from "./utils/errors";

const TableName = "Issues";

const resolvers: Resolvers = {
  Query: {
    findIssueQuery: async (_parent, args): Promise<Issue> => {
      try {
        return await dynamo
          .findOne({ TableName, Key: marshall({ id: args.id }) })
          .then((res) => {
            if (!res.Item) throw new Error();
            return unmarshall(res.Item) as Issue;
          });
      } catch (err) {
        throw invalidGetError();
      }
    },
    findAllIssuesQuery: async (_parent, _args): Promise<Issue[]> => {
      try {
        return await dynamo.findAll({ TableName }).then((res) => {
          if (!res.Items) throw new Error();
          const issues: Issue[] = [];
          res.Items.forEach((item) => {
            issues.push(unmarshall(item) as Issue);
          });
          return issues;
        });
      } catch (err) {
        throw invalidGetError();
      }
    },
  },
  Mutation: {
    createIssueMutation: async (_parent, args): Promise<MoveResponse> => {
      try {
        const newIssue: Issue = {
          id: uuidv4(),
          title: args.input.title,
          status: Status.Backlog,
          createdAt: args.input.createdAt,
        };
        return await dynamo
          .createOne({ TableName, Item: marshall(newIssue) })
          .then((res) => {
            if (!res) throw new Error();
            const ret: MoveResponse = {
              id: newIssue.id,
              message: `New Issue #${newIssue.id} created.`,
            };
            return ret;
          });
      } catch (err) {
        throw invalidGetError();
      }
    },
    deleteIssueMutation: async (_parent, args): Promise<MoveResponse> => {
      try {
        console.log(args.id);
        return await dynamo
          .deleteOne({ TableName, Key: marshall({ id: args.id }) })
          .then((res) => {
            if (!res) throw new Error();
            const ret: MoveResponse = {
              id: args.id as string,
              message: `Issue #${args.id} deleted.`,
            };
            return ret;
          });
      } catch (err) {
        throw invalidGetError();
      }
    },
  },
};

export default resolvers;
