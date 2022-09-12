import React from 'react';
import "./FaceRecognition.css";
import Box from "../Box/Box.js";


const FaceRecognition = ({ imageUrl, Boxes }) => {
    let counter = 0;
    const BoxComponents = Boxes.map((item) => {
        counter = counter + 1;
        return(
            <Box 
                key={counter}
                top={item[1]}
                right={item[2]}
                bottom={item[3]}
                left={item[0]}
            />
        );
    });

    return(
            <div className="center">
                <div className="image">
                    <img id="inputimage" src={imageUrl}  alt="a pic" width="500px" height="auto"/>
                    {BoxComponents}
                </div>
            </div>
        );
}

export default FaceRecognition;

// export const FaceRecognition = ({ imageUrl, Boxes }) => {
// console.log(Boxes)
// // 216.68px 137.74px 295.257px 162.734px;
// 216.68px 137.74px 295.257px 162.734px
//     return (
//       <div className='center'>
//         <div className='image'>
//           <img id='inputimage' alt='hey' src={imageUrl} width='500px' height='auto'/>
//           <div className='bounding-box' style={{top: Boxes.topRow, right: Boxes.rightCol, bottom: Boxes.bottomRow, left: Boxes.leftCol}}></div>
//         </div>
//       </div>
//     );
//   }