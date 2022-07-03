#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GraphqlLambdaStack } from "../lib/graphql-lambda-stack";

const app = new cdk.App();
new GraphqlLambdaStack(app, "IssueTrackerSampleStack", {
  functionName: "IssueTrackerSampleFunction",
});
