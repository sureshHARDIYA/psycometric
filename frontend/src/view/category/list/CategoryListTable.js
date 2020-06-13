import { i18n } from 'i18n';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import ButtonLink from 'view/shared/styles/ButtonLink';
import { Table, Popconfirm, Divider, Avatar } from 'antd';
import actions from 'modules/category/list/CategoryListActions';
import categorySelector from 'modules/category/categorySelectors';
import selectors from 'modules/category/list/CategoryListSelectors';
import destroyActions from 'modules/category/destroy/categoryDestroyActions';
import destroySelectors from 'modules/category/destroy/categoryDestroySelectors';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';
import _get from 'lodash/get';

class CategoryListTable extends Component {
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
      title: 'Avatar',
      dataIndex: 'featuredImage',
      render: (_, record) => {
        const url = _get(
          record,
          'featuredImage[0].publicUrl',
        );

        return url ? (
          <Avatar shape="square" size="large" src={url} />
        ) : (
          <Avatar icon="user" shape="square" size="large" />
        );
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_, record) => (
        <Link to={`/category/${record.id}`}>
          {record.id}
        </Link>
      ),
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      key: 'description-category',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: 'createdAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      dataIndex: '',
      width: '175px',
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
          <Divider type="vertical" />
          {this.props.hasPermissionToEdit && (
            <Link to={`/category/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}{' '}
          <Divider type="vertical" />
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
      <div>
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
      </div>
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

export default connect(select)(CategoryListTable);
