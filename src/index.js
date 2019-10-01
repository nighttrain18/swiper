import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from './Swiper';

const colors = ['green', 'blue', 'yellow']

ReactDOM.render(
    <Swiper>
        {
            colors.map((color, index) => <div className="page" style={{backgroundColor: color, width: '100%', height: '500px'}}></div>)
        }
    </Swiper>, 
    document.getElementById('root'));
