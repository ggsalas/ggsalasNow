import React from 'react'
import Link from 'next/link'

import Post from './post'
import { getPosts } from '../Api'
const SITE = 'techcrunch.com'

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

  onClickPost = ( post ) => {
    this.setState({ post: post })
  }

  onClosePost = () => {
    this.setState({ post: null })
  }

  render() {
    return (
      <div>
        <span>Ver publicaciones del Blog: </span>
        <input 
          name = 'site'
          defaultValue = { SITE }
          onChange = { e => e.target.value.length > 5 ? this.onSiteChange(e) : null}
        />
        { this.state.data && this.state.data.posts
          ? ( <ul>
                { this.state.data.posts.map(( post ) => (
                    <li key={post.ID}>
                      <span onClick={ () => this.onClickPost( post ) }>{post.title}</span>
                      {
                        this.state.post && this.state.post.ID == post.ID
                          ? <Post post={ this.state.post } close={ this.onClosePost }/>
                          : null
                      }
                    </li>
                )) }
            </ul> )
          : <p>{this.state.error}</p>
        }
      </div>
    )
  }
}

export default Index
