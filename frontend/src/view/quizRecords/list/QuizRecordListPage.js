import { i18n } from 'i18n';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import QuizRecordListTable from 'view/quizRecords/list/QuizRecordListTable';

class QuizRecordListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.questionnaire.list.title')}
          </PageTitle>
          <QuizRecordListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default QuizRecordListPage;
