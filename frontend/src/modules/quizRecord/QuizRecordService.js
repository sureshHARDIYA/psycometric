import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class QuizRecordService {
  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_DESTROY($ids: [String!]!) {
          quizRecordDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.quizRecordDestroy;
  }
  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_IMPORT(
          $data: QuizRecordInput!
          $importHash: String!
        ) {
          quizRecordImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.quizRecordImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTION_FIND($id: String!) {
          quizRecordFind(id: $id) {
            id
            title
            explainAnswer
            quizRecordType
            answers {
              title
              score
              isCorrect
              answerType
            }
          }
        }
      `,
      variables: { id },
    });

    return response.data.quizRecordFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTION_LIST(
          $filter: QuizRecordFilterInput
          $limit: Int
          $offset: Int
        ) {
          quizRecordList(
            filter: $filter
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              title
              kind
              randomizeQuestion
              randomizeOptions
              questionnaire
              questions {
                question
                score
                questionText
                answers {
                  title
                  score
                  isCorrect
                }
              }
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.quizRecordList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTION_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          quizRecordAutocomplete(
            query: $query
            limit: $limit
          ) {
            id
            label
          }
        }
      `,
      variables: { query, limit },
    });

    return response.data.quizRecordAutocomplete;
  }
}
