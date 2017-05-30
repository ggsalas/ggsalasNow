import React from 'react'
import { getPost } from '../Api'

class Post extends React.Component {

  // Get data and render on the server
  static async getInitialProps({ pathname, query }) {
    return await getPost( query.site, query.id )
  // return { site: query.site, id: query.id }
  }

  render() {
    return (
      <div>
        <h2>{this.props.post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.post.content}}>

        </div>
      </div>
    )
  }
}

export default Post

