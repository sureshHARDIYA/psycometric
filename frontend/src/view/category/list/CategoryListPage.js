import { i18n } from 'i18n';
import React, { Component } from 'react';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import CategoryListTable from 'view/category/list/CategoryListTable';
import CategoryListToolbar from 'view/category/list/CategoryListToolbar';

class CategoryListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.category.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.category.list.title')}
          </PageTitle>
          <CategoryListToolbar />
          <CategoryListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default CategoryListPage;
