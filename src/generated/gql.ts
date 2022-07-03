import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Issue = {
  __typename?: 'Issue';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  status: Status;
  title: Scalars['String'];
};

export type IssueInput = {
  createdAt: Scalars['String'];
  title: Scalars['String'];
};

export type MoveResponse = {
  __typename?: 'MoveResponse';
  id: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeIssueMutation: MoveResponse;
  createIssueMutation: MoveResponse;
  deleteIssueMutation: MoveResponse;
  discardIssueMutation: MoveResponse;
  progressIssueMutation: MoveResponse;
};


export type MutationCompleteIssueMutationArgs = {
  id: Scalars['String'];
};


export type MutationCreateIssueMutationArgs = {
  input: IssueInput;
};


export type MutationDeleteIssueMutationArgs = {
  id: Scalars['String'];
};


export type MutationDiscardIssueMutationArgs = {
  id: Scalars['String'];
};


export type MutationProgressIssueMutationArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAllIssuesQuery?: Maybe<Array<Issue>>;
  findIssueQuery?: Maybe<Issue>;
};


export type QueryFindIssueQueryArgs = {
  id: Scalars['String'];
};

export enum Status {
  Backlog = 'BACKLOG',
  Completed = 'COMPLETED',
  Discarded = 'DISCARDED',
  InProgress = 'IN_PROGRESS'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Issue: ResolverTypeWrapper<Issue>;
  IssueInput: IssueInput;
  MoveResponse: ResolverTypeWrapper<MoveResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Issue: Issue;
  IssueInput: IssueInput;
  MoveResponse: MoveResponse;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export type IssueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoveResponse'] = ResolversParentTypes['MoveResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  completeIssueMutation?: Resolver<ResolversTypes['MoveResponse'], ParentType, ContextType, RequireFields<MutationCompleteIssueMutationArgs, 'id'>>;
  createIssueMutation?: Resolver<ResolversTypes['MoveResponse'], ParentType, ContextType, RequireFields<MutationCreateIssueMutationArgs, 'input'>>;
  deleteIssueMutation?: Resolver<ResolversTypes['MoveResponse'], ParentType, ContextType, RequireFields<MutationDeleteIssueMutationArgs, 'id'>>;
  discardIssueMutation?: Resolver<ResolversTypes['MoveResponse'], ParentType, ContextType, RequireFields<MutationDiscardIssueMutationArgs, 'id'>>;
  progressIssueMutation?: Resolver<ResolversTypes['MoveResponse'], ParentType, ContextType, RequireFields<MutationProgressIssueMutationArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findAllIssuesQuery?: Resolver<Maybe<Array<ResolversTypes['Issue']>>, ParentType, ContextType>;
  findIssueQuery?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<QueryFindIssueQueryArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Issue?: IssueResolvers<ContextType>;
  MoveResponse?: MoveResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

