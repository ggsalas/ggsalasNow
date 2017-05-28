import React from 'react'

class Post extends React.Component {

  // Get data and render on the server
  // static async getInitialProps() {
  //   return await getPosts( SITE )
  // }

  render() {
    return (
      <div>
        <div onClick={ this.props.close }>[ X ]</div>
          <div dangerouslySetInnerHTML={{ __html: this.props.post.content }}>
        </div>
      </div>
    )
  }
}

export default Post

