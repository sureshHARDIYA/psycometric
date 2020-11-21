import gql from 'graphql-tag'
import graphqlClient from 'modules/shared/graphql/graphqlClient'

export default class EmotionService {
  static async destroyAll (ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RECORD_DESTROY($ids: [String!]!) {
          emotionDestroy(ids: $ids)
        }
      `,
      variables: { ids }
    })

    return response.data.emotionDestroy
  }

  static async find (id) {
    const response = await graphqlClient.query({
      query: gql`
        query RECORD_FIND($id: String!) {
          emotionFind(id: $id) {
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
      variables: { id }
    })

    return response.data.emotionFind
  }

  static async list (filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query RECORD_LIST(
          $filter: EmotionFilterInput
          $limit: Int
          $offset: Int
        ) {
          emotionList(
            filter: $filter
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              emotion
              degree
              createdAt
              createdBy {
                id 
                email
                fullName
              }
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset }
    })

    return response.data.emotionList
  }
}