import { i18n } from 'i18n';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
import ButtonLink from 'view/shared/styles/ButtonLink';
import TableWrapper from 'view/shared/styles/TableWrapper';
import actions from 'modules/feedback/list/feedbackListActions';
import categorySelector from 'modules/feedback/feedbackSelectors';
import selectors from 'modules/feedback/list/feedbackListSelectors';
import destroyActions from 'modules/feedback/destroy/feedbackDestroyActions';
import destroySelectors from 'modules/feedback/destroy/feedbackDestroySelectors';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';

class FeedbackListTable extends Component {
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
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
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
          </ButtonLink>{' '}
          {this.props.hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
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
      <React.Fragment>
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
        </TableWrapper>
        <AuditLogViewModal
          visible={!!this.state.selectedValues}
          code={this.state.selectedValues}
          onCancel={() => this.onAuditLogViewModalClose()}
        />
      </React.Fragment>
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
    hasPermissionToEdit: categorySelector.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: categorySelector.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(FeedbackListTable);
