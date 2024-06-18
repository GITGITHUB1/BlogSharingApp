import React, { useContext, useState } from 'react'
import { context } from '../../App';

const LoginModal = () => {
    const { state, dispatch } = useContext(context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let alertBox = document.getElementById('alertBox');
    //Login REQUEST
    const sendLoginData = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json();
        if (response.status === 404 || !data) {
            alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
           <strong>Sorry!</strong> Invalid Credentials.
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000)


        }
        else if (response.status === 422) {
            alertBox.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
           <strong>Nah!</strong> Fill all the credentials.
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000)
        }
        else {
            dispatch({ type: 'USER', payload: false })
            alertBox.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Bravo!</strong> You have been Signedin Successfully.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000)
            setEmail("");
            setPassword("");
        }

    }

    return (
        <>
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Login to Step-in</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form method="POST">
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" name="email" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" onClick={sendLoginData} data-dismiss="modal" className="btn btn-primary">Login</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginModal;