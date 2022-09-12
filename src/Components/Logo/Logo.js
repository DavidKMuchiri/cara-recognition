import React, { Component } from 'react'; 
import Tilt from 'react-tilt'
import brain from './brain.png';
import "./Logo.css";

class Logo extends Component {
    render(){
        return(
            <div>
                <Tilt className="Tilt" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner"> <img src={brain} alt="brain" /> </div>
                </Tilt>
            </div>
        );
    }
}

export default Logo;