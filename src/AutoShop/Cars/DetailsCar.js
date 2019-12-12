import React from 'react';
import config from '../../helpers/config'

class DetailsCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {carsGet: []};
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        fetch(`${config.apiUrl}/carsGet/${id}`)
        .then((response) => response.json())
            .then(carsGet => this.setState({carsGet}))
            .catch(error => this.setState({ error, isLoading: false}));
    }
    render(){            
        const { make, model, year, doors, description, priceamount, pricecurrency, engine, image, color } = this.state.carsGet;
            return (
                <div className="detailsfix">
                    <img alt="" src={image} style={{width: '350pt'}}/>
                    <h1>{make} {model}</h1><br/>
                    <p>{priceamount} {pricecurrency}</p><br/>
                    <div>{description}</div>
                    
                    <div>
                        <table id="domainpack">
                            <thead>
                                <tr>
                                    <th>Doors</th>
                                    <th>Engine</th>
                                    <th>Color</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{doors}</td>
                                    <td>{engine}</td>
                                    <td>{color}</td>
                                    <td>{year}</td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }

export default DetailsCar;