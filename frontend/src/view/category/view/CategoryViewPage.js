import { i18n } from 'i18n';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import CategoryView from 'view/category/view/CategoryView';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import actions from 'modules/category/view/categoryViewActions';
import selectors from 'modules/category/view/categoryViewSelectors';

class CategoryViewPage extends Component {
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
            [i18n('entities.category.menu'), '/category'],
            [i18n('entities.category.view.title')],
          ]}
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.category.view.title')}
          </PageTitle>
          <CategoryView
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

export default connect(select)(CategoryViewPage);
