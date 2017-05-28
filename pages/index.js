import React from 'react'
import Link from 'next/link'

import { getPosts } from '../Api'
const SITE = 'ggsalas.com'

class Index extends React.Component {

  // Get data and render on the server
  static async getInitialProps() {
    return await getPosts( SITE )
  }

  constructor( props ) {
    super( props )
    this.state = { 
      site: SITE,
      data: this.props.data
    }
  }

  onSiteChange = ( event ) => {
    const site = event.target.value

    getPosts( site )
    .then((response) => {
      if(response) {
        this.setState({ 
          site,
          data: response.data
        })
      } else {
        this.setState({ 
          site, 
          data: {},
          error: 'no se encuentra el blog'
        })
      }
    })
  }

  render() {
    return (
      <div>
        <span>Ver publicaciones del Blog: </span>
        <input 
          name = 'site'
          defaultValue = { SITE }
          onChange = { this.onSiteChange }
        />
        <ul>
          { this.state.data && this.state.data.posts
            ? (this.state.data.posts.map(( post ) => (
                <li key={post.ID}>
                  <a href={post.URL}>{post.title}</a>
                </li>
              )))
            : <p>{this.state.error}</p>
          }
        </ul>
      </div>
    )
  }
}

export default Index
