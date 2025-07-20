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
          <div className="col-md-12 px-0">
            <h1 className="display-4 font-italic">Need a fix or have a skill? </h1>
            <h3><p className="lead my-3">From leaky taps to flawless flooring, every task finds its match here. Post your needs or offer your craft—because great work starts with the right connection.</p></h3>
            <Link className="nav-NavLink" to="/about"><button type="button" className="btn btn-danger btn-lg">Seeking for a help or want to be a freelancer ?</button></Link>

          </div>
        </div>
        <hr className="featurette-divider" />
        <div className='text-center my-5'>
          <button type="button" className="btn btn-primary"><h1 className='display-4'>Our Happy Customers !</h1></button>
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