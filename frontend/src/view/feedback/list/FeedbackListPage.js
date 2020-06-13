import { i18n } from 'i18n';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import FeedbackListTable from 'view/feedback/list/FeedbackListTable';

class FeedbackListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.feedback.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.feedback.list.title')}
          </PageTitle>
          <FeedbackListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default FeedbackListPage;
