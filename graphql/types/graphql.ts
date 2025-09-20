/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Conversation = {
  __typename?: "Conversation";
  id: Scalars["ID"]["output"];
  lastMessage: Scalars["String"]["output"];
  otherUser: OtherProfile;
  unreadCounts?: Maybe<Scalars["Int"]["output"]>;
  updateAt: Scalars["String"]["output"];
};

export type ConversationsPage = {
  __typename?: "ConversationsPage";
  conversations?: Maybe<Array<Conversation>>;
  nextToken?: Maybe<Scalars["String"]["output"]>;
};

export type IPost = {
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  profile?: Maybe<IProfile>;
};

export type IProfile = {
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type Match = {
  __typename?: "Match";
  active?: Maybe<Scalars["Boolean"]["output"]>;
  createdAt: Scalars["String"]["output"];
  endAt?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isLive?: Maybe<Scalars["Boolean"]["output"]>;
  matchType?: Maybe<MatchType>;
  name: Scalars["String"]["output"];
  scores?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Array<Maybe<Source>>>;
  sportType?: Maybe<SportType>;
  startAt?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  teams?: Maybe<Array<Maybe<Team>>>;
  tournament?: Maybe<Tournament>;
  updateAt?: Maybe<Scalars["String"]["output"]>;
  version?: Maybe<Scalars["Int"]["output"]>;
};

export enum MatchType {
  Domestic = "Domestic",
  International = "International",
  League = "League",
  Women = "Women",
}

export type Media = {
  __typename?: "Media";
  fileUrl: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type Message = {
  __typename?: "Message";
  conversationId: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  from: OtherProfile;
  id: Scalars["ID"]["output"];
  message: Scalars["String"]["output"];
};

export type MessagesPage = {
  __typename?: "MessagesPage";
  messages?: Maybe<Array<Message>>;
  nextToken?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  deletePost: Scalars["Boolean"]["output"];
  editMyProfile: MyProfile;
  follow: OtherProfile;
  like: Post;
  post: Post;
  reply: Reply;
  repost: Repost;
  sendDirectMessage: Message;
  unfollow: OtherProfile;
  unlike: Post;
  unrepost: Scalars["Boolean"]["output"];
};

export type MutationDeletePostArgs = {
  postId: Scalars["String"]["input"];
};

export type MutationEditMyProfileArgs = {
  newProfile: ProfileInput;
};

export type MutationFollowArgs = {
  otherUserId: Scalars["ID"]["input"];
};

export type MutationLikeArgs = {
  postId: Scalars["ID"]["input"];
};

export type MutationPostArgs = {
  media?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  text: Scalars["String"]["input"];
};

export type MutationReplyArgs = {
  postId: Scalars["ID"]["input"];
  text: Scalars["String"]["input"];
};

export type MutationRepostArgs = {
  postId: Scalars["ID"]["input"];
};

export type MutationSendDirectMessageArgs = {
  message: Scalars["String"]["input"];
  otherUserId: Scalars["ID"]["input"];
};

export type MutationUnfollowArgs = {
  otherUserId: Scalars["ID"]["input"];
};

export type MutationUnlikeArgs = {
  postId: Scalars["ID"]["input"];
};

export type MutationUnrepostArgs = {
  postId: Scalars["ID"]["input"];
};

export type MyProfile = IProfile & {
  __typename?: "MyProfile";
  bio?: Maybe<Scalars["String"]["output"]>;
  birthdate?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  followersCount: Scalars["Int"]["output"];
  followingCount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  likesCounts: Scalars["Int"]["output"];
  location?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  postsCount: Scalars["Int"]["output"];
  updateAt: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
  website?: Maybe<Scalars["String"]["output"]>;
};

export type News = {
  __typename?: "News";
  createdAt: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  link?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  sourceIcon?: Maybe<Scalars["String"]["output"]>;
  sourceUrl?: Maybe<Scalars["String"]["output"]>;
  sportType?: Maybe<SportType>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type NewsInput = {
  featured?: InputMaybe<Scalars["Boolean"]["input"]>;
  sportType?: InputMaybe<SportType>;
};

export type OtherProfile = IProfile & {
  __typename?: "OtherProfile";
  bio?: Maybe<Scalars["String"]["output"]>;
  birthdate?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  followedBy: Scalars["Boolean"]["output"];
  followersCount: Scalars["Int"]["output"];
  following: Scalars["Boolean"]["output"];
  followingCount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  likesCounts: Scalars["Int"]["output"];
  location?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  posts: PostsPage;
  postsCount: Scalars["Int"]["output"];
  updateAt: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
  website?: Maybe<Scalars["String"]["output"]>;
};

export type Post = IPost & {
  __typename?: "Post";
  createdAt: Scalars["String"]["output"];
  data?: Maybe<PostData>;
  id: Scalars["ID"]["output"];
  liked: Scalars["Boolean"]["output"];
  likes: Scalars["Int"]["output"];
  media?: Maybe<Array<Maybe<Media>>>;
  profile?: Maybe<IProfile>;
  replies?: Maybe<Array<Maybe<Post>>>;
  repliesCount: Scalars["Int"]["output"];
  reposted: Scalars["Boolean"]["output"];
  reposts: Scalars["Int"]["output"];
  text?: Maybe<Scalars["String"]["output"]>;
  type: PostType;
};

export type PostData = Match | News | Tournament;

export enum PostType {
  Match = "Match",
  News = "News",
  Post = "Post",
  Reply = "Reply",
  Repost = "Repost",
  Tournament = "Tournament",
}

export type PostsPage = {
  __typename?: "PostsPage";
  nextToken?: Maybe<Scalars["String"]["output"]>;
  posts?: Maybe<Array<Post>>;
};

export type ProfileInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  birthdate?: InputMaybe<Scalars["String"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type ProfilesPage = {
  __typename?: "ProfilesPage";
  nextToken?: Maybe<Scalars["String"]["output"]>;
  profiles?: Maybe<Array<Maybe<OtherProfile>>>;
};

export type Query = {
  __typename?: "Query";
  getDirectMessages: MessagesPage;
  getFollowers: ProfilesPage;
  getFollowing: ProfilesPage;
  getLatestNews: PostsPage;
  getLikedPostsByUsername: PostsPage;
  getLikes: PostsPage;
  getMyProfile: MyProfile;
  getMyTimeline: PostsPage;
  getPostById: Post;
  getPosts: PostsPage;
  getPostsByUserId: PostsPage;
  getPostsByUsername: PostsPage;
  getProfileByUserId?: Maybe<OtherProfile>;
  getProfileByUsername?: Maybe<OtherProfile>;
  getReplyByPostId: PostsPage;
  getTimeline: PostsPage;
  getUsersWhoLikedPost: ProfilesPage;
  listConversations: ConversationsPage;
  matchById?: Maybe<Post>;
  schedule: PostsPage;
  search: SearchResultsPage;
  tournamentById?: Maybe<Post>;
};

export type QueryGetDirectMessagesArgs = {
  limit: Scalars["Int"]["input"];
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  otherUserId: Scalars["ID"]["input"];
};

export type QueryGetFollowersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type QueryGetFollowingArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type QueryGetLatestNewsArgs = {
  input?: InputMaybe<NewsInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetLikedPostsByUsernameArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type QueryGetLikesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type QueryGetMyTimelineArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetPostByIdArgs = {
  postId: Scalars["String"]["input"];
};

export type QueryGetPostsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
};

export type QueryGetPostsByUserIdArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type QueryGetPostsByUsernameArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type QueryGetProfileByUserIdArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetProfileByUsernameArgs = {
  username: Scalars["String"]["input"];
};

export type QueryGetReplyByPostIdArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  postId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetTimelineArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetUsersWhoLikedPostArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
  postId: Scalars["String"]["input"];
};

export type QueryListConversationsArgs = {
  limit: Scalars["Int"]["input"];
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryMatchByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryScheduleArgs = {
  input?: InputMaybe<ScheduleInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySearchArgs = {
  input: SearchInput;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTournamentByIdArgs = {
  id: Scalars["String"]["input"];
};

export type Reply = IPost & {
  __typename?: "Reply";
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  inReplyToPost: IPost;
  inReplyToUsers?: Maybe<Array<IProfile>>;
  liked: Scalars["Boolean"]["output"];
  likes: Scalars["Int"]["output"];
  profile?: Maybe<IProfile>;
  repliesCount: Scalars["Int"]["output"];
  reposted: Scalars["Boolean"]["output"];
  reposts: Scalars["Int"]["output"];
  text: Scalars["String"]["output"];
};

export type Repost = IPost & {
  __typename?: "Repost";
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  profile?: Maybe<IProfile>;
  repostOf: IPost;
};

export type ScheduleInput = {
  endAt?: InputMaybe<Scalars["String"]["input"]>;
  featured?: InputMaybe<Scalars["Boolean"]["input"]>;
  matchType?: InputMaybe<MatchType>;
  sportType?: InputMaybe<SportType>;
  startAt?: InputMaybe<Scalars["String"]["input"]>;
};

export type SearchInput = {
  isHashTag?: InputMaybe<Scalars["Boolean"]["input"]>;
  mode: SearchMode;
  query: Scalars["String"]["input"];
};

export enum SearchMode {
  Latest = "Latest",
  Match = "Match",
  News = "News",
  People = "People",
  Tournament = "Tournament",
}

export type SearchResult =
  | Match
  | MyProfile
  | News
  | OtherProfile
  | Post
  | Reply
  | Tournament;

export type SearchResultsPage = {
  __typename?: "SearchResultsPage";
  nextToken?: Maybe<Scalars["String"]["output"]>;
  results?: Maybe<Array<Maybe<SearchResult>>>;
};

export type Source = {
  __typename?: "Source";
  data?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
};

export enum SportType {
  Cricket = "cricket",
}

export type Subscription = {
  __typename?: "Subscription";
  counter?: Maybe<Scalars["String"]["output"]>;
  messageCreated?: Maybe<Message>;
  postAdded: Post;
  postUpdated: Post;
};

export type SubscriptionMessageCreatedArgs = {
  conversationId: Scalars["String"]["input"];
};

export type Team = {
  __typename?: "Team";
  imageId?: Maybe<Scalars["String"]["output"]>;
  teamId: Scalars["ID"]["output"];
  teamName?: Maybe<Scalars["String"]["output"]>;
  teamSName?: Maybe<Scalars["String"]["output"]>;
};

export type Tournament = {
  __typename?: "Tournament";
  active?: Maybe<Scalars["Boolean"]["output"]>;
  createdAt: Scalars["String"]["output"];
  endAt?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  match?: Maybe<Array<Maybe<Post>>>;
  matchType?: Maybe<MatchType>;
  name: Scalars["String"]["output"];
  source?: Maybe<Scalars["String"]["output"]>;
  sourceId?: Maybe<Scalars["String"]["output"]>;
  sportType?: Maybe<SportType>;
  startAt?: Maybe<Scalars["String"]["output"]>;
  table?: Maybe<Scalars["String"]["output"]>;
  updateAt?: Maybe<Scalars["String"]["output"]>;
  version?: Maybe<Scalars["String"]["output"]>;
};

export type UnhydratedPostsPage = {
  __typename?: "UnhydratedPostsPage";
  nextToken?: Maybe<Scalars["String"]["output"]>;
  posts?: Maybe<Array<IPost>>;
};
