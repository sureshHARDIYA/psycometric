import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class RuleService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RULE_UPDATE(
          $id: String!
          $data: RuleUpdateInput!
        ) {
          ruleUpdate(id: $id, data: $data) {
            id
            min
            max
            message
          }
        }
      `,
      variables: { id, data }
    });

    return response.data.ruleUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RULE_DESTROY($ids: [String!]!) {
          ruleDestroy(ids: $ids)
        }
      `,
      variables: { ids },
    });

    return response.data.ruleDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation RULE_CREATE($data: RuleInput!) {
          ruleCreate(data: $data) {
            id
            min
            max
            message
          }
        }
      `,
      variables: { data },
    });

    return response.data.ruleCreate;
  }
}
