import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';

const colors = ['green', 'blue', 'yellow']

ReactDOM.render(
    <Carousel>
        {
            colors.map((color, index) => {
                return <div className="page" style={{backgroundColor: color, width: '100%', height: '400px'}}></div>
            })
        }
    </Carousel>, 
    document.getElementById('root'));
