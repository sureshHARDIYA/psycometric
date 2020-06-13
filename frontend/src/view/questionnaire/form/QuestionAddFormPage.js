import { i18n } from 'i18n';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getHistory } from 'modules/store';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import QuestionForm from 'view/questionnaire/form/QuestionForm';
import actions from 'modules/question/form/questionFormActions';
import selectors from 'modules/question/form/questionFormSelectors';

class QuestionAddFormPage extends Component {
  state = {
    dispatched: false,
    questionID: '',
  };

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      const questionnaireID =
        match.path ===
          '/questionnaire/:id/question/:id/edit' &&
        match.url.split('/')[2];
      this.setState({
        questionID: questionnaireID,
      });
      dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
      this.setState({
        questionID: match.params.id,
      });
    }

    this.setState({
      dispatched: true,
    });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    const questionID = this.state.questionID;

    if (this.isEditing()) {
      dispatch(actions.doUpdate(id, data, questionID));
    } else {
      dispatch(actions.doCreate(data, questionID));
    }
  };

  isEditing = () => {
    const { match } = this.props;

    return match.path ===
      '/questionnaire/:id/question/:id/edit'
      ? true
      : false;
  };

  title = () => {
    return this.isEditing()
      ? i18n('entities.questionnaire.question.edit.title')
      : i18n('entities.questionnaire.question.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.questionnaire.menu'), '/questionnaire'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>
          {this.state.dispatched && (
            <QuestionForm
              questionID={this.state.questionID}
              saveLoading={this.props.saveLoading}
              findLoading={this.props.findLoading}
              record={this.props.record}
              isEditing={this.isEditing()}
              onSubmit={this.doSubmit}
              onCancel={() =>
                getHistory().push(
                  `/questionnaire/${this.state.questionID}/`,
                )
              }
            />
          )}
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(QuestionAddFormPage);
