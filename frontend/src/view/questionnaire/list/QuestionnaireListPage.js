import React, { Component } from 'react';
import QuestionnaireListFilter from 'view/questionnaire/list/QuestionnaireListFilter';
import QuestionnaireListTable from 'view/questionnaire/list/QuestionnaireListTable';
import QuestionnaireListToolbar from 'view/questionnaire/list/QuestionnaireListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class QuestionnaireListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.questionnaire.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.questionnaire.list.title')}
          </PageTitle>
          <QuestionnaireListToolbar />
          <QuestionnaireListFilter />
          <QuestionnaireListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default QuestionnaireListPage;
