import { i18n } from 'i18n';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import QuestionnaireView from 'view/questionnaire/view/QuestionnaireView';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import QuestionnaireViewToolbar from 'view/questionnaire/view/QuestionnaireViewToolbar';
import actions from 'modules/questionnaire/view/QuestionnaireViewActions';
import selectors from 'modules/questionnaire/view/QuestionnaireViewSelectors';

class QuestionnairePage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    const { record, loading, match } = this.props;

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.questionnaire.menu'), '/questionnaire'],
            [i18n('entities.questionnaire.view.title')],
          ]}
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.questionnaire.view.title')}
          </PageTitle>
          <QuestionnaireViewToolbar
            match={match}
          />
          <QuestionnaireView
            loading={loading}
            record={record}
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

export default connect(select)(QuestionnairePage);
