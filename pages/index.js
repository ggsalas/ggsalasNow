import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { getPosts, getPost } from '../Api'
import Modal from '../components/modal'
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
    .then(( response ) => {
      if( response ) {
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

  onGoPost (e, site, id ) {
    e.preventDefault()
    Router.push(`/?postId=${id}`, `/post?site=${site}&id=${id}`)
    getPost( site, id )
    .then(( response ) => {
      this.setState({
        post: response.post,
      })
    })
  }

  dismissModal () {
    Router.push('/')
  }

  render() {
    return (
      <div className='index'>
        <span>Ver publicaciones del Blog: </span>
        <input 
          className='siteSearch'
          name = 'site'
          defaultValue = { SITE }
          onChange = { e => e.target.value.length > 5 ? this.onSiteChange( e ) : null } 
        />
        {
          this.props.url.query && this.props.url.query.postId &&
            <Modal
              id = { this.props.url.query.postId }
              post = { this.state.post }
              onDismiss = { () => this.dismissModal() }
            />
        }
        { 
          this.state.data && this.state.data.posts
          ? ( <ul className='postList'>
                { this.state.data.posts.map(( post ) => (
                    <li className='postItem'  key={post.ID}>
                    <span onClick={ e => this.onGoPost( e, this.state.site, post.ID ) }>{ post.title }</span>
                    </li>
                )) }
            </ul> )
          : <p>{ this.state.error }</p>
        }
      </div>
    )
  }
}

export default Index

