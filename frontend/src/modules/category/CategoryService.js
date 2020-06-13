import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class CategoryService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CATEGORY_UPDATE(
          $id: String!
          $data: CategoryInput!
        ) {
          categoryUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });

    return response.data.categoryUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CATEGORY_DESTROY($ids: [String!]!) {
          categoryDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.CategoryDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CATEGORY_CREATE($data: CategoryInput!) {
          categoryCreate(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.categoryCreate;
  }

  static async createQuestion(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CATEGORY_CREATEQUESTION(
          $id: String!
          $data: CategoryInput!
        ) {
          categoryCreateQuestion(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.categoryCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CATEGORY_IMPORT(
          $data: CategoryInput!
          $importHash: String!
        ) {
          categoryImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.categoryImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query CATEGORY_FIND($id: String!) {
          categoryFind(id: $id) {
            id
            name
            description
            questionnaires {
              id
              name
            }
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id },
    });

    return response.data.categoryFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query CATEGORY_LIST(
          $filter: CategoryFilterInput
          $orderBy: CategoryOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          categoryList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              name
              description
              updatedAt
              featuredImage {
                publicUrl
              }
              createdAt
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.categoryList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query CATEGORY_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          categoryAutocomplete(
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

    return response.data.categoryAutocomplete;
  }
}
