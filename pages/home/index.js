
import Router from 'next/router'
import Head from 'next/head'

function Home(props) {
    debugger
    return (
       <>
          <Head>
             <title>Welcome to Next.js!</title>
          </Head>
          <div>Welcome to Next.js!</div>
          <span onClick={() => Router.push('/posts/one')}>First Post</span>
          <br/>
          <div>Next stars: {props.stars}</div>
         
       </>	    
    )
 }
 
 export async function getServerSideProps(context) {
    const res = await fetch('https://api.spaceXdata.com/v3/launches?limit=100')
    const json = await res.json();
    console.log(json)
    return {
       props: { stars: json}
    }
 }
 
 export default Home