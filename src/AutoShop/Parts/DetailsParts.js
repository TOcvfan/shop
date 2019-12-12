import React from 'react';
import config from '../../helpers/config';

class DetailsPart extends React.Component {
    constructor(props){
        super(props);
        this.state = {partsGet: []};
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        fetch(`${config.apiUrl}/partsGet/${id}`)
        .then((response) => response.json())
            .then(partsGet => this.setState({partsGet}))
            .catch(error => this.setState({ error, isLoading: false}));
    }
    render(){            
        const { formake, formodel, foryear, type, description, priceamount, pricecurrency, forengine, image, stock } = this.state.partsGet;
            return (
                <div className="detailsfix">
                    <h2>{type}</h2>
                    <img alt="" src={image} style={{width: '350pt'}}/>
                    
                    <p>{priceamount} {pricecurrency}</p><br/>
                    <div>{description}</div>
                    <div>Remaining items: {stock}</div>
                    
                    <div>Fits:
                        <table id="domainpack">
                            <thead>
                                <tr>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Engine</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formake}</td>
                                    <td>{formodel}</td>
                                    <td>{forengine}</td>
                                    <td>{foryear}</td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
    
export default DetailsPart;