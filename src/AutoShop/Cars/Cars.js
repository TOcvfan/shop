import React from 'react';
import config from '../../helpers/config'
import SearchBox from '../SearchBox';
import {Link} from 'react-router-dom';

const initialState = {
    carsGet: [],
    searchfield: '',
    isLoading: true,
    error: null
} 

class Cars extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount(){
        fetch(`${config.apiUrl}/carsGet`)
            .then((response) => response.json())
            .then(carsGet => this.setState({carsGet})
            )
            .catch(error => this.setState({ error, isLoading: false}));
    }

    renderList(filteredCars){
        return filteredCars.map(cars =>{
            return(
                <div key={cars.id}>
                    <Link to={`/detailsCar/${cars.id}`} >
                        <div className="clearfix">
                            <img alt="" src={cars.image}/>
                            <h1>{cars.make} {cars.model}</h1>
                            <h2>{cars.priceamount} {cars.pricecurrency}</h2>
                        </div>
                    </Link>
                </div>
            )
        });
    }
    
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render(){
        const { carsGet, searchfield } = this.state;
        const filteredCars = carsGet.filter(item => {
            return (
                Object.keys(item).some(key => 
                    typeof item[key] === "string" && 
                    item[key].toLowerCase().includes(searchfield.toLowerCase()))
            );
        })
        return !carsGet.length ? 
        <h1 className='f1 tc'>LOADING</h1> :
        ( 
            <div>
                <SearchBox searchChange={this.onSearchChange} />
                {this.renderList(filteredCars)}
            </div>
        );
    }
}

export default Cars;