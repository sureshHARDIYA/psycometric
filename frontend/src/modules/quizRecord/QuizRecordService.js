import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class QuizRecordService {
  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RECORD_DESTROY($ids: [String!]!) {
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
        mutation RECORD_IMPORT(
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
        query RECORD_FIND($id: String!) {
          quizRecordFind(id: $id) {
            id
            title
            score
            total
            duration
            questionnaire {
              id
              name
            }
            questions {
              id
              title
              answered {
                id
                title
                score
              }
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
        query RECORD_LIST(
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
              score
              total
              duration
              questions {
                title
                answered {
                  title
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
        query RECORD_AUTOCOMPLETE(
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
