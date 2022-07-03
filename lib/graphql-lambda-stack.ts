import { App, Stack, StackProps } from "aws-cdk-lib";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Function, Runtime, AssetCode } from "aws-cdk-lib/aws-lambda";
import {
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
  IResource,
  MockIntegration,
  PassthroughBehavior,
} from "aws-cdk-lib/aws-apigateway";

interface LambdaApiStackProps extends StackProps {
  functionName: string;
}

export class GraphqlLambdaStack extends Stack {
  private restApi: RestApi;
  private dynamoTable: Table;
  private lambdaFunction: Function;

  constructor(scope: App, id: string, props: LambdaApiStackProps) {
    super(scope, id, props);

    this.dynamoTable = new Table(this, "issues", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "Issues",
    });

    this.restApi = new RestApi(this, this.stackName + "RestApi", {
      deployOptions: {
        stageName: "beta",
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    this.lambdaFunction = new Function(this, "graphqlLambda", {
      code: new AssetCode("./src"),
      handler: "server.handler",
      runtime: Runtime.NODEJS_16_X,
    });

    this.dynamoTable.grantReadWriteData(this.lambdaFunction);

    this.restApi.root.addMethod(
      "ANY",
      new LambdaIntegration(this.lambdaFunction, {})
    );
    addCorsOptions(this.restApi.root);
  }
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod(
    "OPTIONS",
    new MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials":
              "'false'",
            "method.response.header.Access-Control-Allow-Methods":
              "'OPTIONS,GET,PUT,POST,DELETE'",
          },
        },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    }
  );
}
