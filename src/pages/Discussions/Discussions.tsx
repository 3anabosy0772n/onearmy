import * as React from 'react'
import { observer } from 'mobx-react'
import { DISCUSSIONS_MOCK } from 'src/mocks/discussions.mock'

import MaxWidth from 'src/components/Layout/MaxWidth.js'
import Margin from 'src/components/Layout/Margin.js'
import FilterBar from 'src/pages/common/FilterBar/FilterBar'
import ListRow from 'src/pages/Discussions/ListRow/ListRow'

import { Content, Main, ListHeader, PostCount, List, OrderBy } from './elements'

import { HowtoStore } from 'src/stores/Howto/howto.store'
import { withRouter } from 'react-router'
import { functions } from 'src/utils/firebase'
import { GOOGLE_ANALYTICS_CONFIG } from 'src/config/config'

interface IProps {
  howtoStore: HowtoStore
}

// Then we can use the observer component decorator to automatically tracks observables and re-renders on change
@observer
class DiscussionsPageClass extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      posts: DISCUSSIONS_MOCK,
    }
  }

  public async componentDidMount() {
    // load mocks
    const credsRequest = await functions.httpsCallable('getAccessToken')({
      accessScopes: [
        'https://www.googleapis.com/auth/analytics',
        'https://www.googleapis.com/auth/analytics.readonly',
      ],
    })
    console.log('creds request', credsRequest)
    const analyticsReportRequest = functions.httpsCallable('getAnalyticsReport')
    console.log('getting analytics')
    const analyticsReportRows = (await analyticsReportRequest({
      viewId: GOOGLE_ANALYTICS_CONFIG.viewId,
      credentials: credsRequest.data.token,
    })) as any
    console.log('report rows', analyticsReportRows)
    const updatedPosts = this.state.posts
    if (analyticsReportRows) {
      for (const post of updatedPosts) {
        const postAnalytic = analyticsReportRows.find(
          row => row.dimensions[0] === `/discussions/post/${post._id}`,
        )
        if (postAnalytic) {
          post.viewCount = Number(postAnalytic.metrics[0].values[0])
        } else {
          post.viewCount = 0
        }
      }
      this.setState({ posts: updatedPosts })
    }
  }

  public orderListBy(orderType: string) {
    let sortedList = []
    switch (orderType) {
      case 'repliesCount':
        sortedList = this.state.posts.sort((a, b) => {
          return b.commentCount - a.commentCount
        })
        this.setState({ posts: sortedList })
        break
      case 'usefulCount':
        sortedList = this.state.posts.sort((a, b) => {
          return b.usefullCount - a.usefullCount
        })
        this.setState({ posts: sortedList })
        break
      case 'viewsCount':
        sortedList = this.state.posts.sort((a, b) => {
          return b.viewCount - a.viewCount
        })
        this.setState({ posts: sortedList })
        break
      case 'date':
        // TODO : order by date
        break
    }
  }

  public updateResultsList() {
    console.log('Change on filters')
  }

  public render() {
    return (
      <MaxWidth>
        <Margin vertical={1.5}>
          <Content>
            <FilterBar
              section={'discussion'}
              onChange={() => this.updateResultsList()}
            />
            <Margin vertical={1.5} horizontal={1.5}>
              <ListHeader>
                <PostCount>Showing {DISCUSSIONS_MOCK.length} posts</PostCount>
                <OrderBy onClick={() => this.orderListBy('repliesCount')}>
                  Replies
                </OrderBy>
                <OrderBy onClick={() => this.orderListBy('usefulCount')}>
                  Useful
                </OrderBy>
                <OrderBy onClick={() => this.orderListBy('viewsCount')}>
                  Views
                </OrderBy>
                <OrderBy onClick={() => this.orderListBy('date')}>
                  Freshness
                </OrderBy>
              </ListHeader>
              <Main alignItems="flex-start">
                <List>
                  {this.state.posts.map((post, i) => (
                    <ListRow post={post} key={i} />
                  ))}
                </List>
              </Main>
            </Margin>
          </Content>
        </Margin>
      </MaxWidth>
    )
  }
}
export const DiscussionsPage = withRouter(DiscussionsPageClass as any)
