import React from 'react';
import './CreateAdmin.css';
import config from '../../helpers/config';
import history from '../../history';

class CreateAdmin extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        address1: '',
        address2: null,
        zip: '',
        city: '',
        phone: '',
        role: 'Admin'
      };
      this.handleOnChange = this.handleOnChange.bind(this);
      this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    }
  
    handleOnChange(e) {
      //console.log(e.target.value)
      this.setState({ [e.target.name]: e.target.value});
      //console.log(this.state.fname)
    }

    validateForm(e) {
      e.preventDefault();
      
      const {
        hasNameError,
        hasDescriptionError,
        hasEmailError,
        hasSizeError,
      } = this.state;
      if (!hasNameError && !hasDescriptionError && !hasEmailError && !hasSizeError) {
        console.log('All validated!');
        this.setState({ validate: true })
      }
    }

    onSubmitSignIn = () => {
      console.log('button ' + this.state.lname);
      fetch(`${config.apiUrl}/registerShop`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          password: this.state.password,
          address1: this.state.address1,
          address2: this.state.address2,
          zip: this.state.zip,
          city: this.state.city,
          phone: this.state.phone,
          role: this.state.role	
        })
      })
      .then((response) => {
        console.log(response);
        (response.json())})
      .then((user) => {
       if (user) {
        this.props.loadUser(user);
        history.push('/');
        console.log('end ' + user);
      }
      })
    }

    render(){
        return(
          <div className="body">
          <div className="form">
            <div id="signup">
              <h1 className="signupheader">Sign Up for Free</h1>
              <form>

                <div className="top-row">
                  <div className="field-wrap">
                  <label>
                      First Name<span className="req">*</span>
                    </label>
                    <input name="fname" type="text" onChange={this.handleOnChange}/>
                      
                  </div>

                  <div className="field-wrap">
                  <label>
                      Last Name<span className="req">*</span>
                    </label>
                    <input name="lname" type="text" onChange={this.handleOnChange}/>
                  
                  </div>
                </div>

                <div className="field-wrap">
                  <label>
                      Email Address<span className="req">*</span>
                    </label>
                    <input name="email" type="text" onChange={this.handleOnChange}/>
                    
                </div>

                <div className="field-wrap">
                <input name="password" type="password" onChange={this.handleOnChange}/>
                    
                </div>

                <div className="field-wrap">
                  <label>
                      Address<span className="req">*</span>
                    </label>
                    <input name="address1" type="text" onChange={this.handleOnChange}/>
                    
                </div>

                <div className="field-wrap">
                  <label>
                      Address (optional)
                    </label>
                    <input name="address2" type="text" onChange={this.handleOnChange}/>
                    
                </div>

                <div className="field-wrap">
                  <label>
                      Zip<span className="req">*</span>
                    </label>
                    <input name="zip" type="number" onChange={this.handleOnChange}/>
                </div>

                <div className="field-wrap">
                  <label>
                      City<span className="req">*</span>
                    </label>
                    <input name="city" type="text" onChange={this.handleOnChange}/>
                </div>

                <div className="field-wrap">
                  <label>
                      Phone<span className="req">*</span>
                    </label>
                    <input name="phone" type="number" onChange={this.handleOnChange}/>
                </div>

                <input type="submit" className="button button-block" onClick={this.onSubmitSignIn} value="Register" />

              </form>

            </div>

          </div>
        </div>
        );
    }
}
export default CreateAdmin;