import React from 'react';
import kittens from '../components/media/kittens.jpg';
import {description1Eng, firstEng, headlineEng} from '../TxtFile';

export class StartPage extends React.Component{
    render(){
        return(
            <div>
                <div className="flex">
                    <div className="text">
                        <h1 style={{display: 'flex'}}><p>{firstEng}</p>{headlineEng}</h1>
                        <p>{description1Eng}</p>
                    </div>
                    <img alt='' src={kittens} style={{width: '50%'}}/>
                </div>
                <p className="lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        );
    }
}

export default StartPage;