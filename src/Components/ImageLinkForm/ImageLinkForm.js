import React from 'react'; 
import "./ImageLinkForm.css";

const ImageLinkForm = ( { onInputChange, onButtonSubmit } ) => {
    return(
        <div >
            <p>
            {"This Magic Brain will detect faces in your pictures. Give it a try."}
            </p>

            <div className="center ">
                <div className="inputplace center form">
                    <input className="input" type="text" onChange={onInputChange}/>
                    <button className="button" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;