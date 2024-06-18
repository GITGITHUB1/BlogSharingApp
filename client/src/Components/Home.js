import React, { useEffect, useState } from 'react'
import LoginModal from './Modal/loginmodal';
import { Link } from 'react-router-dom';
import Helper from './Helper';
const Home = () => {
  const [post, setPost] = useState([]);
  const url = "https://source.unsplash.com/random/";
  //Hitting Backend to fetch all the posts
  const getPosts = async () => {
    const response = await fetch('/getposts', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json();
    setPost(data);
    console.log(data);
  }

  useEffect(() => {
    getPosts();
  }, [])
  return (
    <>
      <main role="main">


        <div className="jumbotron p-3 p-md-5 mt-4 text-white rounded bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 font-italic">QUOTE OF THE DAY</h1>
            <h3><p className="lead my-3">Believe in the power of small steps. Each one, no matter how tiny, brings you closer to your goals.</p></h3>
            <Link className="nav-NavLink" to="/about"><button type="button" className="btn btn-danger btn-lg">Start your Journey of Sharing Thoughts</button></Link>

          </div>
        </div>
        <hr className="featurette-divider" />
        <div className='text-center my-3'>
          <button type="button" className="btn btn-primary"><h1 className='display-4'>POSTS BY SOME CONTRIBUTORS</h1></button>
        </div>
        <hr className="featurette-divider my-5" />
        
        {/* Dynamically fetching the posts */}
        {
          post.map((elem) => {
            return <Helper elem={elem}></Helper>
          })
        }



        <footer className="container">
          <p className="float-right"><a href="#">Back to top</a></p>
          <p>© 2024 All Rights Reserved by Raghav</p>
        </footer>
      </main>
    </>
  )
}

export default Home;