import { i18n } from 'i18n';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import ButtonLink from 'view/shared/styles/ButtonLink';
import TableWrapper from 'view/shared/styles/TableWrapper';
import actions from 'modules/quizRecord/list/QuizRecordListActions';
import quizRecordSelectors from 'modules/quizRecord/QuizRecordSelectors';
import selectors from 'modules/quizRecord/list/QuizRecordListSelectors';
import destroyActions from 'modules/questionnaire/destroy/QuestionnaireDestroyActions';
import destroySelectors from 'modules/questionnaire/destroy/QuestionnaireDestroySelectors';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';

class QuizRecordListTable extends Component {
  state = {
    selectedValues: null,
  };

  onAuditLogViewModalClose() {
    this.setState({ selectedValues: null });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch());
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    {
      title: 'Title',
      dataIndex: 'id',
      render: (_, record) => (
        <Link to={`/questionnaire/${record.id}`}>
          {record.title}
        </Link>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      render: (_, record) => <span>{record.score} / {record.total}</span>
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <ButtonLink
          onClick={() =>
            this.setState({
              selectedValues: JSON.stringify(
                record,
                null,
                2,
              ),
            })
          }
        >
          {i18n('common.view')}
        </ButtonLink>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;
    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
        <AuditLogViewModal
          visible={!!this.state.selectedValues}
          code={this.state.selectedValues}
          onCancel={() => this.onAuditLogViewModalClose()}
        />
      </TableWrapper>
    );
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
    hasPermissionToEdit: quizRecordSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: quizRecordSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(QuizRecordListTable);
