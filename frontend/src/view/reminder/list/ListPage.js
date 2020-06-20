import { i18n } from 'i18n';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import ReminderListTable from 'view/reminder/list/ListTable';
import ReminderListToolbar from 'view/reminder/list/ListToolbar';

class ReminderListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.reminder.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.reminder.list.title')}
          </PageTitle>
          <ReminderListToolbar />
          <ReminderListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default ReminderListPage;
