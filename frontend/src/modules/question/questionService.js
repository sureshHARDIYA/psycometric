import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class QuestionService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_UPDATE(
          $id: String!
          $data: QuestionInput!
        ) {
          questionUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });

    return response.data.questionUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_DESTROY($ids: [String!]!) {
          questionDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.questionDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_CREATE($data: QuestionInput!) {
          questionCreate(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.questionCreate;
  }

  static async createQuestion(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_CREATEQUESTION(
          $id: String!
          $data: QuestionInput!
        ) {
          questionCreateQuestion(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.questionCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTION_IMPORT(
          $data: QuestionInput!
          $importHash: String!
        ) {
          questionImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.questionImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTION_FIND($id: String!) {
          questionFind(id: $id) {
            id
            title
          }
        }
      `,
      variables: { id },
    });

    return response.data.questionFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTION_LIST(
          $filter: QuestionFilterInput
          $orderBy: QuestionOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          questionList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              title
              updatedAt
              createdAt
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.questionList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTION_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          questionAutocomplete(
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

    return response.data.questionAutocomplete;
  }
}
