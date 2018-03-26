import React from 'react'

import Post from '../pages/post'
import { getPosts } from '../Api'

const Modal = props => {
  let _background, _container

  const dismiss = e => {
    if (_background === e.target || _container === e.target) {
      props.onDismiss && props.onDismiss()
    }
  }

  return (
    <div
      ref={el => (_background = el)}
      className="background-modal"
      onClick={dismiss}
    >
      <div ref={el => (_container = el)} className="container">
        <Post postId={props.id} post={props.post} containerRemove={true} />
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
          background: rgba(0, 0, 0, 0.65);
        }
        .container {
          margin: 60px 40px;
          background: white;
        }
      `}</style>
    </div>
  )
}

export default Modal
