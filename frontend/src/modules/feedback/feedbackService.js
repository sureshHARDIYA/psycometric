import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class FeedbackService {
  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation FEEDBACK_DESTROY($ids: [String!]!) {
          feedbackDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.FeedbackDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation FEEDBACK_CREATE($data: FeedbackInput!) {
          feedbackCreate(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.feedbackCreate;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query FEEDBACK_FIND($id: String!) {
          feedbackFind(id: $id) {
            id
            email
            message
            createdAt
          }
        }
      `,
      variables: { id },
    });

    return response.data.feedbackFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query FEEDBACK_LIST(
          $filter: FeedbackFilterInput
          $orderBy: FeedbackListOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          feedbackList(
            filter: $filter
            limit: $limit
            orderBy: $orderBy
            offset: $offset
          ) {
            count
            rows {
              id
              email
              message
              createdAt
            }
          }
        }
      `,
      variables: { filter, limit, orderBy, offset },
    });

    return response.data.feedbackList;
  }
}
