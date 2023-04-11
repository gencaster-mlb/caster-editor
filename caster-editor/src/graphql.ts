import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date with time (isoformat) */
  DateTime: any;
  UUID: any;
  Upload: any;
  /** Represents NULL values */
  Void: any;
};

export type AddAudioFile = {
  description: Scalars['String'];
  file: Scalars['Upload'];
  fileName: Scalars['String'];
  name: Scalars['String'];
};

/**
 * A collection of :class:`~Node` and :class:`~Edge`.
 * This can be considered a score as well as a program as it
 * has an entry point as a :class:`~Node` and can jump to any
 * other :class:`~Node`, also allowing for recursive loops/cycles.
 *
 * Each node can be considered a little program on its own which can consist
 * of multiple :class:`~ScriptCell` which can be coded in a variety of
 * languages which can control the frontend and the audio (by e.g. speaking
 * on the stream) or setting a background music.
 *
 * The story graph is a core concept and can be edited with a native editor.
 */
export type AddGraphInput = {
  /** Name of the graph */
  name: Scalars['String'];
};

/** AudioCell(uuid, playback, audio_file, volume) */
export type AudioCell = {
  audioFile: AudioFile;
  playback: PlaybackChoices;
  uuid: Scalars['UUID'];
  volume: Scalars['Float'];
};

/** AudioCell(uuid, playback, audio_file, volume) */
export type AudioCellInput = {
  audioFile: AudioFileReference;
  playback?: InputMaybe<PlaybackChoices>;
  uuid?: InputMaybe<Scalars['UUID']>;
  volume?: InputMaybe<Scalars['Float']>;
};

/**
 * Represents a local audio file on the server.
 * As SuperCollider and Django are running on the same server we
 * can pass these files to the SuperCollider instances as they
 * are mounted within each service.
 */
export type AudioFile = {
  /** Allows to separate automatic generated audio files speech to text and user uploads */
  autoGenerated: Scalars['Boolean'];
  description: Scalars['String'];
  file?: Maybe<DjangoFileType>;
  /** Acts as an identifier for humans */
  name: Scalars['String'];
  uuid: Scalars['UUID'];
};

/**
 * Represents a local audio file on the server.
 * As SuperCollider and Django are running on the same server we
 * can pass these files to the SuperCollider instances as they
 * are mounted within each service.
 */
export type AudioFileFilter = {
  /** Allows to separate automatic generated audio files speech to text and user uploads */
  autoGenerated?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<StrFilterLookup>;
  /** Acts as an identifier for humans */
  name?: InputMaybe<StrFilterLookup>;
};

/**
 * Represents a local audio file on the server.
 * As SuperCollider and Django are running on the same server we
 * can pass these files to the SuperCollider instances as they
 * are mounted within each service.
 */
export type AudioFileReference = {
  uuid?: InputMaybe<Scalars['UUID']>;
};

export type AudioFileUploadResponse = AudioFile | InvalidAudioFile;

/** Choice of foobar */
export enum CellType {
  Audio = 'AUDIO',
  Comment = 'COMMENT',
  Markdown = 'MARKDOWN',
  Python = 'PYTHON',
  Supercollider = 'SUPERCOLLIDER'
}

export type DjangoFileType = {
  name: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

/**
 * Connects two :class:`~Node` with each other.
 *
 * .. todo::
 *
 *     With a script we can also jump to any other node
 *     so it is not clear how to use this.
 *     Maybe take a look at visual programming languages
 *     such as MSP or Scratch how they handle this?
 */
export type Edge = {
  inNode: Node;
  outNode: Node;
  uuid: Scalars['UUID'];
};

export type EdgeInput = {
  nodeInUuid: Scalars['UUID'];
  nodeOutUuid: Scalars['UUID'];
};

/**
 * A collection of :class:`~Node` and :class:`~Edge`.
 * This can be considered a score as well as a program as it
 * has an entry point as a :class:`~Node` and can jump to any
 * other :class:`~Node`, also allowing for recursive loops/cycles.
 *
 * Each node can be considered a little program on its own which can consist
 * of multiple :class:`~ScriptCell` which can be coded in a variety of
 * languages which can control the frontend and the audio (by e.g. speaking
 * on the stream) or setting a background music.
 *
 * The story graph is a core concept and can be edited with a native editor.
 */
export type Graph = {
  edges: Array<Edge>;
  /** Name of the graph */
  name: Scalars['String'];
  nodes: Array<Node>;
  uuid: Scalars['UUID'];
};

export type IntFilterLookup = {
  contains?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  exact?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  iContains?: InputMaybe<Scalars['Int']>;
  iEndsWith?: InputMaybe<Scalars['Int']>;
  iExact?: InputMaybe<Scalars['Int']>;
  iRegex?: InputMaybe<Scalars['String']>;
  iStartsWith?: InputMaybe<Scalars['Int']>;
  inList?: InputMaybe<Array<Scalars['Int']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  range?: InputMaybe<Array<Scalars['Int']>>;
  regex?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

/** Matches :class:`gencaster.stream.exceptions.InvalidAudioFile`. */
export type InvalidAudioFile = {
  error: Scalars['String'];
};

/** Mutations for GenCaster via GraphQL. */
export type Mutation = {
  addAudioFile: AudioFileUploadResponse;
  /**
   * Creates a :class:`~story_graph.models.Edge` for a given
   * :class:`~story_graph.models.Graph`.
   * It does not return the created edge.
   */
  addEdge?: Maybe<Scalars['Void']>;
  addGraph: Graph;
  /**
   * Creates a new :class:`~story_graph.models.Node` in a given
   * ~class:`~story_graph.models.Graph`.
   * Although it creates a new node with UUID we don't hand it back yet.
   */
  addNode?: Maybe<Scalars['Void']>;
  /** Creates or updates a given :class:`~story_graph.models.ScriptCell` to change its content. */
  createUpdateScriptCells: Array<ScriptCell>;
  createUpdateStreamVariable: Array<StreamVariable>;
  /** Deletes a given :class:`~story_graph.models.Edge`. */
  deleteEdge?: Maybe<Scalars['Void']>;
  /** Deletes a given :class:`~story_graph.models.Node`. */
  deleteNode?: Maybe<Scalars['Void']>;
  /** Deletes a given :class:`~story_graph.models.ScriptCell`. */
  deleteScriptCell?: Maybe<Scalars['Void']>;
  /**
   * Updates a given :class:`~story_graph.models.Node` which can be used
   * for renaming or moving it across the canvas.
   */
  updateNode?: Maybe<Scalars['Void']>;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationAddAudioFileArgs = {
  newAudioFile: AddAudioFile;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationAddEdgeArgs = {
  newEdge: EdgeInput;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationAddGraphArgs = {
  graphInput: AddGraphInput;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationAddNodeArgs = {
  newNode: NodeCreate;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationCreateUpdateScriptCellsArgs = {
  nodeUuid: Scalars['UUID'];
  scriptCellInputs: Array<ScriptCellInput>;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationCreateUpdateStreamVariableArgs = {
  streamVariables: Array<StreamVariableInput>;
};


/** Mutations for GenCaster via GraphQL. */
export type MutationDeleteEdgeArgs = {
  edgeUuid: Scalars['UUID'];
};


/** Mutations for GenCaster via GraphQL. */
export type MutationDeleteNodeArgs = {
  nodeUuid: Scalars['UUID'];
};


/** Mutations for GenCaster via GraphQL. */
export type MutationDeleteScriptCellArgs = {
  scriptCellUuid: Scalars['UUID'];
};


/** Mutations for GenCaster via GraphQL. */
export type MutationUpdateNodeArgs = {
  nodeUpdate: NodeUpdate;
};

/** Matches :class:`gencaster.stream.exceptions.NoStreamAvailable`. */
export type NoStreamAvailable = {
  error: Scalars['String'];
};

/** A node. */
export type Node = {
  color: Scalars['String'];
  inEdges: Array<Edge>;
  /** Acts as a singular entrypoint for our graph.Only one such node can exist per graph. */
  isEntryNode: Scalars['Boolean'];
  /** Name of the node */
  name: Scalars['String'];
  outEdges: Array<Edge>;
  /** x-Position in graph canvas */
  positionX: Scalars['Float'];
  /** y-Position in graph canvas */
  positionY: Scalars['Float'];
  scriptCells: Array<ScriptCell>;
  uuid: Scalars['UUID'];
};

export type NodeCreate = {
  color?: InputMaybe<Scalars['String']>;
  graphUuid: Scalars['UUID'];
  name: Scalars['String'];
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
};

export type NodeUpdate = {
  color?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
  uuid: Scalars['UUID'];
};

/** An enumeration. */
export enum PlaybackChoices {
  AsyncPlayback = 'ASYNC_PLAYBACK',
  SyncPlayback = 'SYNC_PLAYBACK'
}

/** Queries for GenCaster. */
export type Query = {
  audioFile: AudioFile;
  audioFiles: Array<AudioFile>;
  graph: Graph;
  graphs: Array<Graph>;
  node: Node;
  nodes: Array<Node>;
  streamPoint: StreamPoint;
  streamPoints: Array<StreamPoint>;
  streamVariable: StreamVariable;
};


/** Queries for GenCaster. */
export type QueryAudioFileArgs = {
  pk: Scalars['ID'];
};


/** Queries for GenCaster. */
export type QueryAudioFilesArgs = {
  filters?: InputMaybe<AudioFileFilter>;
};


/** Queries for GenCaster. */
export type QueryGraphArgs = {
  pk: Scalars['ID'];
};


/** Queries for GenCaster. */
export type QueryNodeArgs = {
  pk: Scalars['ID'];
};


/** Queries for GenCaster. */
export type QueryStreamPointArgs = {
  pk: Scalars['ID'];
};


/** Queries for GenCaster. */
export type QueryStreamPointsArgs = {
  filters?: InputMaybe<StreamPointFilter>;
};


/** Queries for GenCaster. */
export type QueryStreamVariableArgs = {
  pk: Scalars['ID'];
};

/**
 * Stores a script which can be executed
 * with our :class:`~story_graph.engine.Engine` on a
 * :class:`~stream.models.Stream`.
 */
export type ScriptCell = {
  audioCell?: Maybe<AudioCell>;
  cellCode: Scalars['String'];
  cellOrder: Scalars['Int'];
  cellType: CellType;
  node: Node;
  uuid: Scalars['UUID'];
};

/**
 * Stores a script which can be executed
 * with our :class:`~story_graph.engine.Engine` on a
 * :class:`~stream.models.Stream`.
 */
export type ScriptCellInput = {
  audioCell?: InputMaybe<AudioCellInput>;
  cellCode: Scalars['String'];
  cellOrder?: InputMaybe<Scalars['Int']>;
  cellType?: InputMaybe<CellType>;
  uuid?: InputMaybe<Scalars['UUID']>;
};

export type StrFilterLookup = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  exact?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iContains?: InputMaybe<Scalars['String']>;
  iEndsWith?: InputMaybe<Scalars['String']>;
  iExact?: InputMaybe<Scalars['String']>;
  iRegex?: InputMaybe<Scalars['String']>;
  iStartsWith?: InputMaybe<Scalars['String']>;
  inList?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  range?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

/**
 * Assigns a :class:`~StreamPoint` to a user/client.
 * This allows us to see which streams are currently in use
 * and also by which user.
 * It also allows us to trace past streams.
 */
export type Stream = {
  active: Scalars['Boolean'];
  createdDate: Scalars['DateTime'];
  modifiedDate: Scalars['DateTime'];
  streamPoint: StreamPoint;
  uuid: Scalars['UUID'];
};

export type StreamInfo = {
  stream: Stream;
  streamInstruction?: Maybe<StreamInstruction>;
};

export type StreamInfoResponse = NoStreamAvailable | StreamInfo;

/**
 * Instruction for a :class:`StreamPoint`, most likely to be
 * created from a :class:`~story_graph.models.ScriptCell`.
 */
export type StreamInstruction = {
  createdDate: Scalars['DateTime'];
  instructionText: Scalars['String'];
  modifiedDate: Scalars['DateTime'];
  returnValue: Scalars['String'];
  state: Scalars['String'];
  uuid: Scalars['UUID'];
};

/**
 * Stores metadata for each SuperCollider/Janus instance
 * and how we can interact with this instance.
 *
 * Every SuperCollider instance that send a beacon to us
 * via the :ref:`OSC Server` will be a StreamPoint.
 * Consider ``last_live`` to filter out non-live from live
 * instances.
 */
export type StreamPoint = {
  createdDate: Scalars['DateTime'];
  host: Scalars['String'];
  /** RTP port where Janus streams the audio its received from user */
  janusInPort?: Maybe<Scalars['Int']>;
  /** Audiobridge room ID under which Janus can send audio to SuperCollider */
  janusInRoom?: Maybe<Scalars['Int']>;
  /** RTP port where SuperCollider/gstreamer streams its audio to Janus */
  janusOutPort?: Maybe<Scalars['Int']>;
  /** Streaming room ID under which Janus serves audio from SuperCollider */
  janusOutRoom?: Maybe<Scalars['Int']>;
  /** Last live signal from SuperCollider server */
  lastLive?: Maybe<Scalars['DateTime']>;
  modifiedDate: Scalars['DateTime'];
  port: Scalars['Int'];
  /** Accepts to send audio input */
  useInput: Scalars['Boolean'];
  uuid: Scalars['UUID'];
};

/**
 * Stores metadata for each SuperCollider/Janus instance
 * and how we can interact with this instance.
 *
 * Every SuperCollider instance that send a beacon to us
 * via the :ref:`OSC Server` will be a StreamPoint.
 * Consider ``last_live`` to filter out non-live from live
 * instances.
 */
export type StreamPointFilter = {
  /** RTP port where Janus streams the audio its received from user */
  janusInPort?: InputMaybe<IntFilterLookup>;
  uuid?: InputMaybe<UuidFilterLookup>;
};

/** StreamVariable(uuid, created_date, modified_date, stream, key, value, stream_to_sc) */
export type StreamVariable = {
  key: Scalars['String'];
  stream: Stream;
  /** Stream values to SC as control rate Ndef */
  streamToSc: Scalars['Boolean'];
  uuid: Scalars['UUID'];
  value: Scalars['String'];
};

export type StreamVariableInput = {
  key: Scalars['String'];
  streamToSc?: Scalars['Boolean'];
  streamUuid: Scalars['UUID'];
  value: Scalars['String'];
};

export type Subscription = {
  count: Scalars['Int'];
  graph: Graph;
  node: Node;
  streamInfo: StreamInfoResponse;
};


export type SubscriptionCountArgs = {
  target?: Scalars['Int'];
};


export type SubscriptionGraphArgs = {
  graphUuid: Scalars['UUID'];
};


export type SubscriptionNodeArgs = {
  nodeUuid: Scalars['UUID'];
};


export type SubscriptionStreamInfoArgs = {
  graphUuid: Scalars['UUID'];
};

export type UuidFilterLookup = {
  contains?: InputMaybe<Scalars['UUID']>;
  endsWith?: InputMaybe<Scalars['UUID']>;
  exact?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  iContains?: InputMaybe<Scalars['UUID']>;
  iEndsWith?: InputMaybe<Scalars['UUID']>;
  iExact?: InputMaybe<Scalars['UUID']>;
  iRegex?: InputMaybe<Scalars['String']>;
  iStartsWith?: InputMaybe<Scalars['UUID']>;
  inList?: InputMaybe<Array<Scalars['UUID']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  range?: InputMaybe<Array<Scalars['UUID']>>;
  regex?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['UUID']>;
};

export type GetGraphsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGraphsQuery = { graphs: Array<{ uuid: any, name: string }> };

export type CreateEdgeMutationVariables = Exact<{
  nodeInUuid: Scalars['UUID'];
  nodeOutUuid: Scalars['UUID'];
}>;


export type CreateEdgeMutation = { addEdge?: any | null };

export type CreateNodeMutationVariables = Exact<{
  name: Scalars['String'];
  graphUuid: Scalars['UUID'];
  color?: InputMaybe<Scalars['String']>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
}>;


export type CreateNodeMutation = { addNode?: any | null };

export type UpdateNodeMutationVariables = Exact<{
  nodeUuid: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
}>;


export type UpdateNodeMutation = { updateNode?: any | null };

export type DeleteNodeMutationVariables = Exact<{
  nodeUuid: Scalars['UUID'];
}>;


export type DeleteNodeMutation = { deleteNode?: any | null };

export type DeleteEdgeMutationVariables = Exact<{
  edgeUuid: Scalars['UUID'];
}>;


export type DeleteEdgeMutation = { deleteEdge?: any | null };

export type CreateUpdateScriptCellsMutationVariables = Exact<{
  nodeUuid: Scalars['UUID'];
  scriptCellInputs: Array<ScriptCellInput> | ScriptCellInput;
}>;


export type CreateUpdateScriptCellsMutation = { createUpdateScriptCells: Array<{ uuid: any }> };

export type DeleteScriptCellMutationVariables = Exact<{
  scriptCellUuid: Scalars['UUID'];
}>;


export type DeleteScriptCellMutation = { deleteScriptCell?: any | null };

export type GraphSubscriptionVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type GraphSubscription = { graph: { name: string, uuid: any, edges: Array<{ uuid: any, outNode: { uuid: any }, inNode: { uuid: any } }>, nodes: Array<{ name: string, uuid: any, positionX: number, positionY: number, color: string, scriptCells: Array<{ cellCode: string, cellOrder: number, cellType: CellType, uuid: any }> }> } };

export type NodeSubscriptionVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type NodeSubscription = { node: { color: string, name: string, positionX: number, positionY: number, uuid: any, scriptCells: Array<{ cellCode: string, cellOrder: number, cellType: CellType, uuid: any, audioCell?: { playback: PlaybackChoices, uuid: any, volume: number, audioFile: { uuid: any, name: string, autoGenerated: boolean, description: string, file?: { url: string, name: string } | null } } | null }> } };

export type CreateGraphMutationVariables = Exact<{
  graphInput: AddGraphInput;
}>;


export type CreateGraphMutation = { addGraph: { name: string, uuid: any, nodes: Array<{ name: string, uuid: any, isEntryNode: boolean }> } };

export type StreamSubscriptionVariables = Exact<{
  graphUuid: Scalars['UUID'];
}>;


export type StreamSubscription = { streamInfo: { __typename: 'NoStreamAvailable', error: string } | { __typename: 'StreamInfo', stream: { active: boolean, createdDate: any, modifiedDate: any, uuid: any, streamPoint: { uuid: any, port: number, useInput: boolean, modifiedDate: any, lastLive?: any | null, host: string, createdDate: any, janusInPort?: number | null, janusInRoom?: number | null, janusOutPort?: number | null, janusOutRoom?: number | null } }, streamInstruction?: { createdDate: any, instructionText: string, modifiedDate: any, state: string, uuid: any, returnValue: string } | null } };

export type StreamPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type StreamPointsQuery = { streamPoints: Array<{ createdDate: any, host: string, janusInPort?: number | null, janusInRoom?: number | null, janusOutPort?: number | null, janusOutRoom?: number | null, lastLive?: any | null, modifiedDate: any, port: number, useInput: boolean, uuid: any }> };

export type UploadAudioFileMutationVariables = Exact<{
  addAudioFile: AddAudioFile;
}>;


export type UploadAudioFileMutation = { addAudioFile: { __typename: 'AudioFile', uuid: any, description: string, file?: { url: string, name: string } | null } | { __typename: 'InvalidAudioFile', error: string } };

export type SendStreamVariableMutationVariables = Exact<{
  streamVariables: Array<StreamVariableInput> | StreamVariableInput;
}>;


export type SendStreamVariableMutation = { createUpdateStreamVariable: Array<{ uuid: any, value: string }> };

export type AudioFilesQueryVariables = Exact<{
  autoGenerated?: Scalars['Boolean'];
  audioNameFilter?: Scalars['String'];
}>;


export type AudioFilesQuery = { audioFiles: Array<{ autoGenerated: boolean, description: string, name: string, uuid: any, file?: { url: string, name: string, size: number } | null }> };


export const GetGraphsDocument = gql`
    query GetGraphs {
  graphs {
    uuid
    name
  }
}
    `;

export function useGetGraphsQuery(options: Omit<Urql.UseQueryArgs<never, GetGraphsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGraphsQuery>({ query: GetGraphsDocument, ...options });
}
export const CreateEdgeDocument = gql`
    mutation createEdge($nodeInUuid: UUID!, $nodeOutUuid: UUID!) {
  addEdge(newEdge: {nodeInUuid: $nodeInUuid, nodeOutUuid: $nodeOutUuid})
}
    `;

export function useCreateEdgeMutation() {
  return Urql.useMutation<CreateEdgeMutation, CreateEdgeMutationVariables>(CreateEdgeDocument);
}
export const CreateNodeDocument = gql`
    mutation createNode($name: String!, $graphUuid: UUID!, $color: String, $positionX: Float, $positionY: Float) {
  addNode(
    newNode: {name: $name, graphUuid: $graphUuid, color: $color, positionX: $positionX, positionY: $positionY}
  )
}
    `;

export function useCreateNodeMutation() {
  return Urql.useMutation<CreateNodeMutation, CreateNodeMutationVariables>(CreateNodeDocument);
}
export const UpdateNodeDocument = gql`
    mutation updateNode($nodeUuid: UUID!, $name: String, $color: String, $positionX: Float, $positionY: Float) {
  updateNode(
    nodeUpdate: {uuid: $nodeUuid, name: $name, color: $color, positionX: $positionX, positionY: $positionY}
  )
}
    `;

export function useUpdateNodeMutation() {
  return Urql.useMutation<UpdateNodeMutation, UpdateNodeMutationVariables>(UpdateNodeDocument);
}
export const DeleteNodeDocument = gql`
    mutation deleteNode($nodeUuid: UUID!) {
  deleteNode(nodeUuid: $nodeUuid)
}
    `;

export function useDeleteNodeMutation() {
  return Urql.useMutation<DeleteNodeMutation, DeleteNodeMutationVariables>(DeleteNodeDocument);
}
export const DeleteEdgeDocument = gql`
    mutation deleteEdge($edgeUuid: UUID!) {
  deleteEdge(edgeUuid: $edgeUuid)
}
    `;

export function useDeleteEdgeMutation() {
  return Urql.useMutation<DeleteEdgeMutation, DeleteEdgeMutationVariables>(DeleteEdgeDocument);
}
export const CreateUpdateScriptCellsDocument = gql`
    mutation CreateUpdateScriptCells($nodeUuid: UUID!, $scriptCellInputs: [ScriptCellInput!]!) {
  createUpdateScriptCells(
    nodeUuid: $nodeUuid
    scriptCellInputs: $scriptCellInputs
  ) {
    uuid
  }
}
    `;

export function useCreateUpdateScriptCellsMutation() {
  return Urql.useMutation<CreateUpdateScriptCellsMutation, CreateUpdateScriptCellsMutationVariables>(CreateUpdateScriptCellsDocument);
}
export const DeleteScriptCellDocument = gql`
    mutation deleteScriptCell($scriptCellUuid: UUID!) {
  deleteScriptCell(scriptCellUuid: $scriptCellUuid)
}
    `;

export function useDeleteScriptCellMutation() {
  return Urql.useMutation<DeleteScriptCellMutation, DeleteScriptCellMutationVariables>(DeleteScriptCellDocument);
}
export const GraphDocument = gql`
    subscription graph($uuid: UUID!) {
  graph(graphUuid: $uuid) {
    name
    uuid
    edges {
      uuid
      outNode {
        uuid
      }
      inNode {
        uuid
      }
    }
    nodes {
      name
      uuid
      scriptCells {
        cellCode
        cellOrder
        cellType
        uuid
      }
      positionX
      positionY
      color
    }
  }
}
    `;

export function useGraphSubscription<R = GraphSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, GraphSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<GraphSubscription, R>) {
  return Urql.useSubscription<GraphSubscription, R, GraphSubscriptionVariables>({ query: GraphDocument, ...options }, handler);
}
export const NodeDocument = gql`
    subscription node($uuid: UUID!) {
  node(nodeUuid: $uuid) {
    color
    name
    positionX
    positionY
    scriptCells {
      cellCode
      cellOrder
      cellType
      uuid
      audioCell {
        playback
        uuid
        volume
        audioFile {
          uuid
          name
          autoGenerated
          description
          file {
            url
            name
          }
        }
      }
    }
    uuid
  }
}
    `;

export function useNodeSubscription<R = NodeSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, NodeSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<NodeSubscription, R>) {
  return Urql.useSubscription<NodeSubscription, R, NodeSubscriptionVariables>({ query: NodeDocument, ...options }, handler);
}
export const CreateGraphDocument = gql`
    mutation CreateGraph($graphInput: AddGraphInput!) {
  addGraph(graphInput: $graphInput) {
    name
    uuid
    nodes {
      name
      uuid
      isEntryNode
    }
  }
}
    `;

export function useCreateGraphMutation() {
  return Urql.useMutation<CreateGraphMutation, CreateGraphMutationVariables>(CreateGraphDocument);
}
export const StreamDocument = gql`
    subscription stream($graphUuid: UUID!) {
  streamInfo(graphUuid: $graphUuid) {
    ... on StreamInfo {
      __typename
      stream {
        active
        createdDate
        modifiedDate
        streamPoint {
          uuid
          port
          useInput
          modifiedDate
          lastLive
          host
          createdDate
          janusInPort
          janusInRoom
          janusOutPort
          janusOutRoom
        }
        uuid
      }
      streamInstruction {
        createdDate
        instructionText
        modifiedDate
        state
        uuid
        returnValue
      }
    }
    ... on NoStreamAvailable {
      __typename
      error
    }
  }
}
    `;

export function useStreamSubscription<R = StreamSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, StreamSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<StreamSubscription, R>) {
  return Urql.useSubscription<StreamSubscription, R, StreamSubscriptionVariables>({ query: StreamDocument, ...options }, handler);
}
export const StreamPointsDocument = gql`
    query streamPoints {
  streamPoints {
    createdDate
    host
    janusInPort
    janusInRoom
    janusOutPort
    janusOutRoom
    lastLive
    modifiedDate
    port
    useInput
    uuid
  }
}
    `;

export function useStreamPointsQuery(options: Omit<Urql.UseQueryArgs<never, StreamPointsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StreamPointsQuery>({ query: StreamPointsDocument, ...options });
}
export const UploadAudioFileDocument = gql`
    mutation UploadAudioFile($addAudioFile: AddAudioFile!) {
  addAudioFile(newAudioFile: $addAudioFile) {
    ... on AudioFile {
      __typename
      uuid
      description
      file {
        url
        name
      }
    }
    ... on InvalidAudioFile {
      __typename
      error
    }
  }
}
    `;

export function useUploadAudioFileMutation() {
  return Urql.useMutation<UploadAudioFileMutation, UploadAudioFileMutationVariables>(UploadAudioFileDocument);
}
export const SendStreamVariableDocument = gql`
    mutation SendStreamVariable($streamVariables: [StreamVariableInput!]!) {
  createUpdateStreamVariable(streamVariables: $streamVariables) {
    uuid
    value
  }
}
    `;

export function useSendStreamVariableMutation() {
  return Urql.useMutation<SendStreamVariableMutation, SendStreamVariableMutationVariables>(SendStreamVariableDocument);
}
export const AudioFilesDocument = gql`
    query AudioFiles($autoGenerated: Boolean! = false, $audioNameFilter: String! = "") {
  audioFiles(
    filters: {autoGenerated: $autoGenerated, name: {iContains: $audioNameFilter}}
  ) {
    autoGenerated
    description
    name
    uuid
    file {
      url
      name
      size
    }
  }
}
    `;

export function useAudioFilesQuery(options: Omit<Urql.UseQueryArgs<never, AudioFilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AudioFilesQuery>({ query: AudioFilesDocument, ...options });
}
