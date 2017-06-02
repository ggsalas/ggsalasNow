import React from 'react'
import Container from '../components/container'
import { getPost } from '../Api'

class Post extends React.Component {

  // Get data and render on the server
  static async getInitialProps({ pathname, query }) {
    return await getPost( query.site, query.id )
  }

  render() {
    return (
      <Container remove={this.props.containerRemove}>
        <div className='post' >
          <h2>{this.props.post.title}</h2>
          <div className='postContent' dangerouslySetInnerHTML={{ __html: this.props.post.content}}></div>

          <style jsx>{`
            .post {
              margin: 20px;
            }
            .postContent :global(img) {
              max-width: 100%;
            }
            .postContent :global(iframe) {
              max-width: 100%;
            }
          `}</style>
        </div>
      </Container>
    )
  }
}

export default Post

