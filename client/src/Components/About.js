import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const About = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState('');
    const num = useRef();
    num.current = 1;
    //A state variable to display all the posts
    const [theme, setTheme] = useState([]);
    //A state variable to check to display posts or not
    const [check, setCheck] = useState(true);
    //useEffect HOOk to run only for once so that it can check that the user is already logged in or not.
    const hitBackendAbout = async () => {
        try {
            const response = await fetch('/about', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
                //The above statement is required as here we are sending cookies HERE
            });
            //Here let's compare it with the Promises ,
            //val11=response,val2=response.json(); and val1 is the first promise hit data received
            const data = await response.json();
            console.log(data);
            setUserData(data);
            if (response.status === 200) {
                console.log("Perfectly executed");
                setCheck(true);
            }
            else if (!response.status === 200) {
                throw new Error(response.err);
            }

        } catch (err) {
            console.log("Request unauthorised");
            const alertBox = document.getElementById('alertBox');
            alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Sorry!</strong> Login First only then You can add Post.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000)
            navigate('/');
        }
    }
    useEffect(() => {
        hitBackendAbout();
    }, [])

    //Function which is triggered on submitting the messageBox 
    const submitPost = async (e) => {
        e.preventDefault();
        const response = await fetch('/quote', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: userData.name,
                message
            })
        })
        const data = await response.json();
        if (response.status == 400 || !data) {
            const alertBox = document.getElementById('alertBox');
            alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>OOP's! </strong>Your post has not been added.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000)
        }
        else {
            const alertBox = document.getElementById('alertBox');
            alertBox.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Congrats! </strong>Your post has been added successfully.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000)
            setMessage('');
            setTheme(data);
            setCheck(false);

        }
    }
    return (
        <>
            <div className="jumbotron p-3 p-md-5 mt-3 text-white rounded bg-dark">
                <div className="px-0">
                    <div className="form-group text-center">
                        <h1><span className="badge badge-danger">Hi! {userData.name}, Start your Thought Sharing Journey</span></h1>
                        <form method='POST'>
                            <textarea className="form-control" style={{ fontSize: '30px' }} id="exampleFormControlTextarea1" onChange={(e) => {
                                setMessage(e.target.value);
                            }} rows="4" value={message}></textarea>
                            <button type="button" className="btn btn-danger btn-lg btn-block mt-4" onClick={submitPost}>Submit your Quote</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='my-3 text-center'>
                <h1><span className="badge badge-primary">Your Posts</span></h1>
            </div>
            {
                check ? <div className="row mb-2">
                    {
                        userData.messages?.map((elem) => {
                            return <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                                <p class="display-4 text-success text-center">POST {num.current++}</p>
                                <hr class='my-1'></hr>
                              <h2 class="display-4 text-center text-dark">{"'"+elem.message+"'"}</h2>
                              <hr class='my-1'></hr>
                            </div>
                          </div>
                        })
                    }
                </div>

                    :
                    <div className="row mb-2">
                        {
                            theme.map((elem) => {
                                return <div class="jumbotron jumbotron-fluid">
                                <div class="container">
                                    <h3 class="display-3 text-success text-center">POST {num.current++}</h3>
                                    <hr class='my-1'></hr>
                                  <h2 class="display-4 text-center text-dark">{elem.message}</h2>
                                  <hr class='my-1'></hr>
                                </div>
                              </div>
                            })
                        }
                    </div>


            }
        </>
    )
}


export default About