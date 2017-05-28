import fetch from 'isomorphic-unfetch'

export function getPosts( site ) {
  const get = fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${site}/posts/`)
  .then( status )
  .then( json )
  .then( data => { return ({data}) } )
  .catch( (reason) => {
    console.log( 'Fetch error: ', reason )
  })

  return get
}


/* 
 * Private funcions
 */
function status( response ) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function json( response ) {  
  return response.json()  
}

