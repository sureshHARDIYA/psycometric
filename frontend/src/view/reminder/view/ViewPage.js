import { i18n } from 'i18n';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ReminderView from 'view/reminder/view/View';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import actions from 'modules/reminder/view/action';
import selectors from 'modules/reminder/view/selector';

class ReminderViewPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.reminder.menu'), '/reminder'],
            [i18n('entities.reminder.view.title')],
          ]}
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.reminder.view.title')}
          </PageTitle>
          <ReminderView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(ReminderViewPage);
