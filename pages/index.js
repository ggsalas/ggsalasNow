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
      <Container display>
        <div className='index'>
          <section className='header'>
            <label htmlFor='site' className='siteSearchLabel'>Ver publicaciones del Blog: </label>
            <input 
              className='siteSearch'
              name = 'site'
              defaultValue = { SITE }
              onChange = { e => e.target.value.length > 5 ? this.onSiteChange( e ) : null } 
            />
          </section>
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
                      <li className='postItem'  key={post.ID} onClick={ e => this.onGoPost( e, this.state.site, post.ID ) }>
                        <span className='postTitle' dangerouslySetInnerHTML={{__html: post.title}}></span>
                      </li>
                  )) }
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
          `}</style>
        </div>
      </Container>
    )
  }
}

export default Index

