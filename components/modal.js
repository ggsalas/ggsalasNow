import React from 'react'

import Post from '../pages/post'
import { getPosts } from '../Api'

class Modal extends React.Component {
  dismiss (e) {
    if (this._background === e.target || this._container === e.target) {
      if (this.props.onDismiss) {
        this.props.onDismiss()
      }
    }
  }

  render () {
    return (
      <div ref={el => (this._background = el)} className='background-modal' onClick={(e) => this.dismiss(e)}>
        <div ref={el => (this._container = el)} className='container'>
          <Post 
            postId = { this.props.id }  
            post = { this.props.post }
          />
        </div>
        <style jsx>{`
          .background-modal {
            position: fixed;
            overflow: scroll;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            background: rgba(0,0,0,.65);
          }
          .container {
            margin: 60px 40px;
            padding: 20px;
            background: white;
          }
          .container :global(img) {
            max-width: 100%;
          }
          .container :global(iframe) {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }

}

export default Modal

