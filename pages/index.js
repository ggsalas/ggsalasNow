import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import Container from '../components/container' 
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

    if( event.target.value.length > 5 ) {
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
  }

  onGoPost = (e, site, post ) => {
    e.preventDefault()
    Router.push(`/?postId=${post.ID}`, `/post?site=${site}&id=${post.ID}`, { shallow: true })
      this.setState({
        post
      })
  }

  dismissModal () {
    Router.push('/', '/', { shallow: true })
  }

  render() {
    return (
      <Container display>
        <div className='index'>
          <section className='header'>
            <label htmlFor='site' className='siteSearchLabel'>Ver publicaciones del Blog: </label>
            <input 
              className='siteSearch'
              name = 'site'
              defaultValue = { SITE }
              onChange = { this.onSiteChange } 
            />
          </section>
          {
            this.props.url.query && this.props.url.query.postId &&
              <Modal
                id = { this.props.url.query.postId }
                post = { this.state.post }
                onDismiss = { this.dismissModal }
              />
          }
          { 
            this.state.data && this.state.data.posts
            ? ( 
                <ul className='postList'>
                  { 
                    this.state.data.posts.map(( post ) => (
                      <li className='postItem'  key={post.ID} onClick={ e => this.onGoPost( e, this.state.site, post ) }>
                        <span className='postTitle' dangerouslySetInnerHTML={{__html: post.title}}></span>
                        <span className='postExcerpt' dangerouslySetInnerHTML={{__html: post.excerpt}}></span>
                      </li>
                    )) 
                  }
                </ul>
              )
            : <p>{ this.state.error }</p>
          }
          <style jsx>{`
            .index {
              margin: 20px;
            }
            .header {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .siteSearch {
              font-size: 30px;
              border: none;
              border-bottom: 4px solid #eee;
              align-self: stretch;
              margin: 0 40px 1em 40px;
            }
            .siteSearchLabel {
              align-self: stretch;
              margin: 0 40px 1em 40px;
            }

            .postList {
              list-style: none;
              margin: 0;
              padding: 0;
              border-top: 2px solid #eee;
            }
            .postItem {
              padding: 1em 0;
              border-bottom: 2px solid #eee;
              cursor: pointer;
            }
            .postItem:hover {
              color: #000;
              border-color: #000;
            }
            .postExcerpt {
              font-size: .8em;
            }
          `}</style>
        </div>
      </Container>
    )
  }
}

export default Index

