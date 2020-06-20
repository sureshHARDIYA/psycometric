/**
 * Maps all the Schema of the application.
 * More about the schema: https://www.apollographql.com/docs/graphql-tools/generate-schema/
 */

const makeExecutableSchema = require('graphql-tools')
  .makeExecutableSchema;
const resolvers = require('./resolvers');

const sharedTypes = require('./shared/types');

const settingsTypes = require('./settings/types');
const settingsQueries = require('./settings/queries');
const settingsMutations = require('./settings/mutations');

const authTypes = require('./auth/types');
const authQueries = require('./auth/queries');
const authMutations = require('./auth/mutations');

const iamTypes = require('./iam/types');
const iamQueries = require('./iam/queries');
const iamMutations = require('./iam/mutations');

const auditLogTypes = require('./auditLog/types');
const auditLogQueries = require('./auditLog/queries');
const auditLogMutations = require('./auditLog/mutations');

const questionnaireTypes = require('./questionnaire/types');
const questionnaireQueries = require('./questionnaire/queries');
const questionnaireMutations = require('./questionnaire/mutations');

const questionTypes = require('./question/types');
const questionQueries = require('./question/queries');
const questionMutations = require('./question/mutations');

const quizRecordTypes = require('./quizRecord/types');
const quizRecordMutations = require('./quizRecord/mutations');
const quizRecordQueries = require('./quizRecord/queries');

const reminderTypes = require('./reminder/types');
const reminderQueries = require('./reminder/queries');
const reminderMutations = require('./reminder/mutations');

const feedbackTypes = require('./feedback/types');
const feedbackQueries = require('./feedback/queries');
const feedbackMutations = require('./feedback/mutations');

const answerTypes = require('./answer/types');
const answerQueries = require('./answer/queries');
const answerMutations = require('./answer/mutations');

const types = [
  ...sharedTypes,
  ...iamTypes,
  ...authTypes,
  ...auditLogTypes,
  ...settingsTypes,
  ...questionnaireTypes,
  ...questionTypes,
  ...quizRecordTypes,
  ...reminderTypes,
  ...feedbackTypes,
  ...answerTypes,
].map((type) => type.schema);

const mutations = [
  ...iamMutations,
  ...authMutations,
  ...auditLogMutations,
  ...settingsMutations,
  ...questionnaireMutations,
  ...questionMutations,
  ...quizRecordMutations,
  ...reminderMutations,
  ...feedbackMutations,
  ...answerMutations,
].map((mutation) => mutation.schema);

const queries = [
  ...iamQueries,
  ...authQueries,
  ...auditLogQueries,
  ...settingsQueries,
  ...questionnaireQueries,
  ...questionQueries,
  ...quizRecordQueries,
  ...feedbackQueries,
  ...reminderQueries,
  ...answerQueries,
].map((query) => query.schema);

const query = `
  type Query {
    ${queries.join('\n')}
  }
`;

const mutation = `
  type Mutation {
    ${mutations.join('\n')}
  }
`;

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;
module.exports = makeExecutableSchema({
  typeDefs: [schemaDefinition, query, mutation, ...types],
  resolvers,
});
