import React, { Component } from 'react';
import "./Signin.css";

class Signin extends Component{
    constructor(props){
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () =>{
            fetch('https://young-meadow-06470.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.id){
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }else{
                    alert(data);
                }
            })

    }

    render(){
        return(
            <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h2 className="active header"> Sign In </h2>
                        <div>
                            <input type="email" id="login" className="fadeIn inputplace"
                            name="login" placeholder="email"
                            onChange = {this.onEmailChange}
                            />
                            <input type="password" id="password" className="fadeIn inputplace"
                            name="login"
                            placeholder="password"
                            onChange = {this.onPasswordChange}
                            />
                            <input type="submit" className="submit" onClick={this.onSubmitSignIn} value="Sign In"/>
                            <div id="formFooter">
                                <p onClick={() => this.props.onRouteChange('register')} className="underlineHover register">Register</p>
                             </div>
                        </div>

                </div>
                </div>
            </div>
        );
    }
}

export default Signin;