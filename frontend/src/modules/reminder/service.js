import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class ReminderService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation REMINDER_UPDATE(
          $id: String!
          $data: ReminderInput!
        ) {
          reminderUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });

    return response.data.reminderUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation REMINDER_DESTROY($ids: [String!]!) {
          reminderDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.reminderDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation REMINDER_CREATE($data: ReminderInput!) {
          reminderCreate(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.reminderCreate;
  }

  static async createQuestion(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation REMINDER_CREATEQUESTION(
          $id: String!
          $data: ReminderInput!
        ) {
          reminderCreateQuestion(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.reminderCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation REMINDER_IMPORT(
          $data: ReminderInput!
          $importHash: String!
        ) {
          reminderImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.reminderImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query REMINDER_FIND($id: String!) {
          reminderFind(id: $id) {
            id
            title
            test
            message
            schedule
            audience
            frequency
            audienceList
            createdAt
          }
        }
      `,
      variables: { id },
    });

    return response.data.reminderFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query REMINDER_LIST(
          $filter: ReminderFilterInput
          $orderBy: ReminderOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          reminderList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              title
              test
              message
              schedule
              audience
              frequency
              audienceList
              createdAt
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.reminderList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query REMINDER_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          reminderAutocomplete(
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

    return response.data.reminderAutocomplete;
  }
}
