import React from 'react'

export default function Container(props) {
    return (
      <div>
        {
          props.remove === true
            ? <div>{ props.children }</div>
            : (
                <div className='container'>
                  { props.children }
                </div>
              )
        }
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
          :global(body) {
            font-family: 'Roboto Mono', monospace;
            color: #555;
            margin: 0;
            padding: 0;
          }

          .container {
            border-top: 8px solid #333;
          }
        `}</style>
      </div>
    )
}
