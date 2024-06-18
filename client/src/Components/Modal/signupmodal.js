import React, { useState } from 'react'
const SignupModal = () => {

    //Now put all the variables in an object state, so that if the user dynamically changes the data it should effect the state variable,the below key names are same as names of the input fields.

    //Setting a State variable which can differentiate the rendering of the alert and the SignUp Page
    const [user, setUser] = useState({ name: "", email: "", password: "", confirmpassword: "", country: "", city: "" });

    //AlertBox Reference
    let alertBox = document.getElementById('alertBox');

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const sendData = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmpassword, country, city } = user;
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                name, email, password, confirmpassword, country, city
            })
        })
        const data = await response.json();
        const alertBox = document.getElementById('alertBox');
        if (response.status === 422 || !data) {
            alertBox.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Sorry!</strong> User already exists.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000);
                
        }
        else if (response.status == 400) {
            alertBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>OOP's!</strong> Please fill the details carefully.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000);
        }
        else if (response.status == 401) {
            alertBox.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Sorry!</strong> Details are missing.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000);
        }
        else {
            alertBox.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Congratulations!</strong> You are good to go.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

            setTimeout(() => {
                alertBox.innerHTML = '';
            }, 3000);
            setUser({ name: "", email: "", password: "", confirmpassword: "", country: "", city: "" });
        }

    }
    return (
        <>
            <div className="modal fade" id="signupModal" tabIndex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signupModalLabel">SignUp</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form method="POST" className='register-form' id='register-form'>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputFirstName">FullName</label>
                                        <input type="text" value={user.name} className="form-control" name="name" id="inputFullName" onChange={handleOnChange} placeholder="FullName" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" value={user.email} className="form-control" name="email" id="inputEmail4" onChange={handleOnChange} placeholder="Email" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input type="password" value={user.password} className="form-control" name="password" id="inputPassword4" onChange={handleOnChange} placeholder="Password" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputConfirmPassword4">Confirm Password</label>
                                    <input type="password" value={user.confirmpassword} className="form-control" name="confirmpassword" id="inputConfirmPassword4" onChange={handleOnChange} placeholder="Confirm Password" />

                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCountry">Country</label>
                                        <input type="text" className="form-control" value={user.country} name="country" onChange={handleOnChange} id="inputCountry" />

                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">City</label>
                                        <input type="text" className="form-control" value={user.city} name="city" onChange={handleOnChange} id="inputCity" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary justify-content-venter" data-dismiss="modal" onClick={sendData}>Register</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
export default SignupModal