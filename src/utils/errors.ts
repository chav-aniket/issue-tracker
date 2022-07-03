import { GraphQLYogaError } from "@graphql-yoga/node";

const customError = (msg: string, code: string) =>
  new GraphQLYogaError(msg, { code });

export const endOfFunctionError = () => {
  return customError("Reached end of function", "END_OF_FUNCTION");
};

export const invalidGetError = () => {
  return customError(
    "Requested resources were not found",
    "RESOURCE_NOT_FOUND"
  );
};
