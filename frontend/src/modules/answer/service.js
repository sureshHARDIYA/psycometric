import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class AnswerService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ANSWER_UPDATE(
          $id: String!
          $data: AnswerInput!
        ) {
          answerUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });

    return response.data.answerUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ANSWER_DESTROY($ids: [String!]!) {
          answerDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.answerDestroy;
  }

  static async create({ questionnaire, ...data}) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ANSWER_CREATE($questionnaire: ID!, $data: AnswerInput!) {
          answerCreate(questionnaire: $questionnaire, data: $data) {
            id
          }
        }
      `,
      variables: { questionnaire, data },
    });

    return response.data.answerCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation ANSWER_IMPORT(
          $data: AnswerInput!
          $importHash: String!
        ) {
          answerImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.answerImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query ANSWER_FIND($id: String!) {
          answerFind(id: $id) {
            id
            title
            score
            answerType
          }
        }
      `,
      variables: { id },
    });

    return response.data.answerFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query ANSWER_LIST(
          $filter: AnswerFilterInput
          $orderBy: AnswerOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          answerList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              title
              score
              answerType
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.answerList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query ANSWER_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          answernAutocomplete(
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

    return response.data.answernAutocomplete;
  }
}
