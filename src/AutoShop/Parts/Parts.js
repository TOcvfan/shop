import React from 'react';
import config from '../../helpers/config';
import SearchBox from '../SearchBox';
import {Link} from 'react-router-dom';

const initialState = {
    partsGet: [],
    searchfield: '',
    isLoading: true,
    error: null
} 

class Parts extends React.Component{
    constructor(props) {
        super(props)
        this.state = initialState;
    }
    
    componentDidMount(){
        fetch(`${config.apiUrl}/partsGet`)
            .then((response) => response.json())
            .then(partsGet => this.setState({partsGet})
            )
            .catch(error => this.setState({ error, isLoading: false}));
    }

    renderList(filteredParts){
        return filteredParts.map(parts =>{
            return(
                <div key={parts.id}>
                    <Link to={`/detailsPart/${parts.id}`} >
                        <div className="clearfix">
                            <img alt="" src={parts.image}/>
                            <h1>{parts.type}</h1>
                            <h5>for: {parts.formake} {parts.formodel}</h5>
                            <h2>{parts.priceamount} {parts.pricecurrency}</h2>
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
        const { partsGet, searchfield } = this.state;
        const filteredParts = partsGet.filter(item =>{
            return (
                Object.keys(item).some(key => 
                    typeof item[key] === "string" && 
                    item[key].toLowerCase().includes(searchfield.toLowerCase()))
            );
        })
        return !partsGet.length ? 
        <h1 className='f1 tc'>LOADING</h1> :
        ( 
            <div>
                <SearchBox searchChange={this.onSearchChange} />
                {this.renderList(filteredParts)}
            </div>
        );
    }
}

export default Parts;