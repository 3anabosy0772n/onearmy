import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { DISCUSSIONS_MOCK } from 'src/mocks/discussions.mock'

import MaxWidth from 'src/components/Layout/MaxWidth.js'
import Margin from 'src/components/Layout/Margin.js'
import FilterBar from 'src/pages/common/FilterBar/FilterBar'
import ListRow from 'src/pages/Discussions/ListRow/ListRow'

import { Content, Main, ListHeader, PostCount, List, OrderBy } from './elements'

import { HowtoStore } from 'src/stores/Howto/howto.store'
import { withRouter } from 'react-router'
import Axios from 'axios'
import { GOOGLE_ANALYTICS_CONFIG} from '../../config/config'
import { getAccessToken } from 'functions/src/gAPIJwtAccessToken'

interface IProps {
  howtoStore: HowtoStore
}

// @inject('howtoStore')
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
    console.log('mocks:', DISCUSSIONS_MOCK)

    await this.analyticsReport((analyticsReportRows) => {
      const updatedPosts = this.state.posts
      if (analyticsReportRows) {
        for (const post of updatedPosts) {
          const postAnalytic = analyticsReportRows.find(
            row => row.dimensions[0] === `/discussions/post/${post._id}`
          )
          if (postAnalytic) {
            post.viewCount = Number(postAnalytic.metrics[0].values[0])
          } else {
            post.viewCount = 0
          }
        }
        this.setState({ posts: updatedPosts })
    }})
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

  public async analyticsReport(callback) {
    await getAccessToken([
      'https://www.googleapis.com/auth/analytics',
      'https://www.googleapis.com/auth/analytics.readonly'
      ], (accessToken) => {
      console.log('access token received', accessToken)
        Axios({
          url: 'https://analyticsreporting.googleapis.com/v4/reports:batchGet',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            reportRequests: [
              {
                viewId: GOOGLE_ANALYTICS_CONFIG.viewId,
                dateRanges: [
                  {
                    startDate: '2019-01-01',
                    endDate: 'today'
                  }
                ],
                metrics: [
                  {
                    expression: 'ga:pageviews'
                  }
                ],
                dimensions: [
                  {
                    name: 'ga:pagePath'
                  }
                ],
                dimensionFilterClauses: [
                  {
                    filters: [
                      {
                        dimensionName: 'ga:pagePath',
                        operator: 'BEGINS_WITH',
                        expressions: [
                          '/discussions/post/'
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }).then((res) => {
          return callback(res.data.reports[0].data.rows)
        })
      }
    )
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
