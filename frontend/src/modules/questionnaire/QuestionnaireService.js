import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class QuestionnaireService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTIONNAIRE_UPDATE(
          $id: String!
          $data: QuestionnaireInput!
        ) {
          questionnaireUpdate(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });

    return response.data.questionnaireUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTIONNAIRE_DESTROY($ids: [String!]!) {
          questionnaireDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.QuestionnaireDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTIONNAIRE_CREATE(
          $data: QuestionnaireInput!
        ) {
          questionnaireCreate(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.questionnaireCreate;
  }

  static async createQuestion(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTIONNAIRE_CREATEQUESTION(
          $id: String!
          $data: QuestionnaireInput!
        ) {
          questionnaireCreateQuestion(
            id: $id
            data: $data
          ) {
            id
          }
        }
      `,
      variables: { data },
    });

    return response.data.questionnaireCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation QUESTIONNAIRE_IMPORT(
          $data: QuestionnaireInput!
          $importHash: String!
        ) {
          questionnaireImport(
            data: $data
            importHash: $importHash
          )
        }
      `,
      variables: { data: values, importHash },
    });

    return response.data.questionnaireImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTIONNAIRE_FIND($id: String!) {
          questionnaireFind(id: $id) {
            id
            name
            description
            status
            schedule
            audience
            test
            frequency
            audienceList
            questions {
              id
              title
            }
            rules {
              id
              min
              max
              message
            }
            answers {
              id
              title
              score
              type
            }
            createdBy {
              id
              email
              firstName
            }
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id },
    });

    return response.data.questionnaireFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTIONNAIRE_LIST(
          $filter: QuestionnaireFilterInput
          $orderBy: QuestionnaireOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          questionnaireList(
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
              status
              level
              updatedAt
              createdAt
              views
              test
              schedule
              audience
              frequency
              audienceList
              createdBy {
                id
                firstName
                email
              }
              createdAt
              updatedAt
            }
          }
        }
      `,
      variables: { filter, orderBy, limit, offset },
    });

    return response.data.questionnaireList;
  }

  static async listAutocomplete(query, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query QUESTIONNAIRE_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          questionnaireAutocomplete(
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

    return response.data.questionnaireAutocomplete;
  }
}
