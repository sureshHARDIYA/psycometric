import { i18n } from 'i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import model from 'modules/questionnaire/QuestionnaireModel';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import {
  Table,
  Tag,
  Popconfirm,
  Divider,
  Card,
  Modal,
  Button,
  Typography,
} from 'antd';
import selectors from 'modules/questionnaire/list/QuestionnaireListSelectors';
import questionSelectors from 'modules/question/questionSelectors';
import destroyActions from 'modules/question/destroy/questionDestroyActions';
import destroyAnswerActions from 'modules/answer/destroy/actions';
import destroyRuleActions from 'modules/rule/destroy/actions';
import destroySelectors from 'modules/question/destroy/questionDestroySelectors';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';
import actions from 'modules/questionnaire/view/QuestionnaireViewActions';
import AnswerFormModal from 'view/questionnaire/form/AnswerFormModal';
import QuestionFormModal from 'view/questionnaire/form/QuestionFormModal';
import RuleFormModal from 'view/questionnaire/form/RuleFormModal';

const _find = require('lodash/find');

const { fields } = model;
const { Paragraph, Text } = Typography;

const gridStyle = {
  width: '25%',
  textAlign: 'left',
};

class QuestionnaireView extends Component {
  state = {
    rule: null,
    answer: null,
    selectedValues: null,
  };

  onAuditLogViewModalClose() {
    this.setState({ selectedValues: null });
  }

  doRefersh = () => {
    const { dispatch, match } = this.props;
    dispatch(actions.doRefresh(match.params.id));
  }

  doRuleDestroy = (id) => {
    const { dispatch, match } = this.props;
    dispatch(destroyRuleActions.doDestroy(id));
    this.doRefersh();
  };

  doRuleSubmit = () => {
    this.setState({ rule: false });
    this.doRefersh();
  }

  doQuestionDestroy = (id) => {
    const { dispatch, match } = this.props;
    dispatch(destroyActions.doDestroy(id));
    this.doRefersh();
  };

  doAnswerDestroy = (id) => {
    const { dispatch, match } = this.props;
    dispatch(destroyAnswerActions.doDestroy(id));
    this.doRefersh();
  };

  doAnswerSubmit = () => {
    this.setState({ answer: false });
    this.doRefersh();
  }

  doQuestionSubmit = () => {
    this.setState({ question: false });
    this.doRefersh();
  }

  ruleColumns = [
    { title: 'Min Score', dataIndex: 'min' },
    { title: 'Max Score', dataIndex: 'max' },
    { title: 'Result', dataIndex: 'message' },
    {
      title: '',
      dataIndex: '',
      width: '180px',
      render: (_, record) => (
        <div className="table-actions">
          <ButtonLink
            style={{ textAlign: 'left' }}
            onClick={() =>
              this.setState({
                selectedValues: JSON.stringify(
                  record,
                  null,
                  2,
                ),
              })
            }>
            {i18n('common.view')}
          </ButtonLink>
          <Divider type="vertical" />
          <ButtonLink onClick={() => this.setState({ rule: record })}>
            {i18n('common.edit')}
          </ButtonLink>
          <Divider type="vertical" />

          <Popconfirm
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doRuleDestroy(record.id)}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <ButtonLink>
              {i18n('common.destroy')}
            </ButtonLink>
          </Popconfirm>
        </div>
      ),
    },
  ];

  answerColumns = [
    {
      title: 'Title',
      dataIndex: 'id',
      render: (_, record) => (
        <ButtonLink
          style={{ textAlign: 'left' }}
          onClick={() =>
            this.setState({
              selectedValues: JSON.stringify(
                record,
                null,
                2,
              ),
            })
          }>
           {record.title}
          </ButtonLink>
      ),
    },
    { title: 'Score', dataIndex: 'score' },
    {
      title: '',
      dataIndex: '',
      width: '180px',
      render: (_, record) => (
        <div className="table-actions">
          <Divider type="vertical" />
          <ButtonLink onClick={() => this.setState({ answer: record })}>
            {i18n('common.edit')}
          </ButtonLink>
          <Divider type="vertical" />

          <Popconfirm
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doAnswerDestroy(record.id)}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <ButtonLink>
              {i18n('common.destroy')}
            </ButtonLink>
          </Popconfirm>
        </div>
      ),
    },
  ];

  columns = [
    {
      title: 'Title',
      dataIndex: 'id',
      render: (_, record) => (
        <ButtonLink
          style={{ textAlign: 'left' }}
          onClick={() =>
            this.setState({
              selectedValues: JSON.stringify(
                record,
                null,
                2,
              ),
            })
          }>
           {record.title}
          </ButtonLink>
      ),
    },
    {
      title: '',
      dataIndex: '',
      width: '180px',
      render: (_, record) => (
        <div className="table-actions">
          <Divider type="vertical" />
          <ButtonLink onClick={() => this.setState({ question: record })}>
            {i18n('common.edit')}
          </ButtonLink>
          <Divider type="vertical" />
          <Popconfirm
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doQuestionDestroy(record.id)}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <ButtonLink>
              {i18n('common.destroy')}
            </ButtonLink>
          </Popconfirm>
        </div>
      ),
    },
  ];

  renderView() {
    const { record, loading } = this.props;
    const { visible, activeItem } = this.state;
    const activeRecord =
      record &&
      _find(record.questions, {
        id: activeItem,
      });

    return (
      <ViewWrapper>
        <Card title="Questionnaire Meta Information">
          <Card.Grid hoverable={false} style={gridStyle}>
            <Text strong>{fields.name.label}: </Text>
            {fields.name.forView(record.name)}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.status.label}: </Text>
            {fields.status.forView(record.status)}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.frequency.label}: </Text>
            {fields.frequency.forView(record.frequency)}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.schedule.label}: </Text>
            {fields.schedule.forView(record.schedule)}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.audience.label}: </Text>
            {fields.audience.forView(record.audience)}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.createdBy.label}: </Text>
            {record.createdBy.firstName}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.createdAt.label}: </Text>
            {fields.updatedAt.forView(record.createdAt)}
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Text strong>{fields.updatedAt.label}: </Text>
            {fields.updatedAt.forView(record.updatedAt)}
          </Card.Grid>
          <Card.Grid style={{ width: '50%' }}>
            <Paragraph
              ellipsis={{ rows: 1, expandable: true }}
              copyable
            >
              {fields.description.forView(
                record.description,
              )}
            </Paragraph>
          </Card.Grid>
        </Card>
        <Divider dashed orientation="left">
          Rules
        </Divider>
        <Table
          rowKey="id"
          loading={loading}
          scroll={{ x: true }}
          columns={this.ruleColumns}
          dataSource={record.rules || []}
        />
        <Divider dashed orientation="left">
          Answers
        </Divider>
        <Table
          rowKey="id"
          loading={loading}
          scroll={{ x: true }}
          columns={this.answerColumns}
          dataSource={record.answers || []}
        />
        <Divider dashed orientation="left">
          Questions
        </Divider>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={record.questions}
          scroll={{ x: true }}
        />
        <Modal
          visible={visible}
          title="Title"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
          ]}
        >
          {activeRecord && (
            <div>
              <p> ID: {activeRecord.id} </p>
              <p> Question: {activeRecord.title} </p>
              <p>
                ExplainAnswer: {activeRecord.explainAnswer}
              </p>
              <p>
                QuestionType: {activeRecord.questionType}
              </p>
              <p>
                Answers:
                {(activeRecord.answers || []).map(
                  (item) => (
                    <Tag color="green">{item.title}</Tag>
                  ),
                )}
              </p>
            </div>
          )}
        </Modal>
        <AuditLogViewModal
          visible={!!this.state.selectedValues}
          code={this.state.selectedValues}
          onCancel={() => this.onAuditLogViewModalClose()}
        />
        <QuestionFormModal
          visible={!!this.state.question}
          record={this.state.question || {}}
          onCancel={() => this.setState({ question: false })}
          onSuccess={this.doQuestionSubmit}
        />
        <AnswerFormModal
          visible={!!this.state.answer}
          record={this.state.answer || {}}
          onCancel={() => this.setState({ answer: false })}
          onSuccess={this.doAnswerSubmit}
        />
        <RuleFormModal
          visible={!!this.state.rule}
          record={this.state.rule || {}}
          onCancel={() => this.setState({ rule: false })}
          onSuccess={this.doRuleSubmit}
        />
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;
    if (!record || loading) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: questionSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: questionSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(withRouter(QuestionnaireView));
