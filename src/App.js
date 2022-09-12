import React, { Component } from 'react';
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Rank from "./Components/Rank/Rank.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Particles from 'react-particles-js';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1000 
      }
    }
  }
}

const initialState = {
    input: "",
    imageUrl: "",
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined_date: ''
    }
}

class App extends Component{
  constructor(){
    super()
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined_date: ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.name,
      entries: data.entries,
      joined_date: data.joined_date
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    let counter1 = 0 ;
    let boxArray = [];
    let finalArray = [];
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    
   while (counter1 < clarifaiFace.length){
    boxArray.push(clarifaiFace[counter1].region_info.bounding_box)
    let leftCol = (boxArray[counter1].left_col) * width;
    let topRow = (boxArray[counter1].top_row) * height;
    let rightCol = width - ((boxArray[counter1].right_col) * width);
    let bottomRow = height - ((boxArray[counter1].bottom_row) * height);

    finalArray.push([leftCol, topRow, rightCol, bottomRow])
    counter1 = counter1 + 1;
   }

    return finalArray;

  }


  displayFaceBoxes = (regions) => {
    this.setState( {boxes: regions} );
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (routeReceived) =>{
    if(routeReceived === 'signin'){
      this.setState(initialState);
    }else if(routeReceived ==='home'){
      this.setState({isSignedIn: true}) 
    }
    this.setState({route: routeReceived});


  }

  onSubmit = () => {

// In the predict, we are using this.state.input since imageUrl
// has just been updated and its value is still not accessible
    
    this.setState({imageUrl: this.state.input});
    fetch('https://young-meadow-06470.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              input: this.state.input,
          })
      })
    .then(response => response.json())
    .then((response) => {
      if(response){
        fetch('https://young-meadow-06470.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count =>{
          return this.setState({
            user: Object.assign(this.state.user, {entries: count})
          });
          // {user: Object.assign(this.state.user, {entries: count})}
        }).catch(error => {
          console.log("Error was encountered in entries count");
        })
      }
      this.displayFaceBoxes(this.calculateFaceLocation(response));
    })
    .catch(error => {console.log("Error in recognizing the face")})
    }

  render(){
    return (
      <div className="App">
        <Particles className="particles" 
          params={particlesOptions}
         />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
        this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
            <FaceRecognition Boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
          </div>
        :(this.state.route === "signin" 
        ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}  />
        : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )
        }
      </div>
    );
  }
}

export default App;


 // calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputimage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height)
  //   }
  // }
 