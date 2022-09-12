import React, { Component } from 'react';
import "./Register.css";

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () =>{
        fetch('https://young-meadow-06470.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
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
                        <h2 className="active header"> Register </h2>
                        <div>
                            <input type="text" id="register" 
                            className="fadeIn inputplace" 
                            name="register"
                             placeholder="name"
                             onInput={this.onNameChange}
                             />
                            <input type="text" 
                            id="login" 
                            className="fadeIn inputplace" 
                            name="register" 
                            placeholder="email"
                            onInput={this.onEmailChange}
                            required
                            />
                            <input 
                            type="text" 
                            id="password" 
                            className="fadeIn inputplace"
                             name="register"
                              placeholder="password"
                              required
                             onInput={this.onPasswordChange}
                              />
                            <input type="submit" className="submit" onClick={this.onSubmitRegister} value="Register"/>
                            <div id="formFooter">
                                <p onClick={() => this.props.onRouteChange('signin')} className="underlineHover signin">Sign in</p>
                             </div>
                        </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Register;