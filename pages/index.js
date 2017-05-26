import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <div>
    <p>Hola</p>
    <ul>
      {props.data.posts.map((post) => (
        <li key={post.ID}>
            <a>{post.title}</a>
        </li>
      ))}
    </ul>
  </div>
)


Index.getInitialProps = async function() {
  const SITE = 'ggsalas.com'
  const res = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${SITE}/posts/`)
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    data: data
  }
}

 export default Index
