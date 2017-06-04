import React from 'react'

export default function Container(props) {
    return (
      <div>
        {
          props.remove === true
            ? <div>{ props.children }</div>
            : (
                <div className='container'>
                  <section className='header'><h1 className='headerTitle'>Wordpress Blog Reader</h1></section>
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
          .headerTitle {
            text-align: center;
            font-size: 30px;
            margin: 20px 20px 30px 20px;
            color: #333;
          }
        `}</style>
      </div>
    )
}
