import { i18n } from 'i18n'
import React, { Component } from 'react'
import Breadcrumb from 'view/shared/Breadcrumb'
import PageTitle from 'view/shared/styles/PageTitle'
import ContentWrapper from 'view/layout/styles/ContentWrapper'
import EmotionTable from 'view/emotion/list/EmotionTable'
import EmotionToolbar from 'view/emotion/list/EmotionToolbar'

class EmotionListPage extends Component {
  render () {
    return (
      <React.Fragment>
        <Breadcrumb
          items={
            [ [ i18n('home.menu'), '/' ], [ i18n('entities.emotion.menu') ] ]
          }
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.emotion.list.title')}
          </PageTitle>
          <EmotionToolbar />
          <EmotionTable />
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

export default EmotionListPage
