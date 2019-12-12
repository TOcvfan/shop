import React from 'react';
import Cars from './Cars/Cars';
import Parts from './Parts/Parts';
import Select from 'react-select';

const selector = [
    { label: "cars" },
    { label: "parts" }
]

class AutoShop extends React.Component{
    constructor() {
        super()
        this.state = {
            selectedOption: 'cars'
        }
    }
    
    onDropdownChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption.label });
    }

    render(){
        const { selectedOption } = this.state;
        
        const products = selectedOption === 'cars' ? <Cars/> : <Parts/>;
        return(
            <div>
                <Select options={ selector } onChange={this.onDropdownChange}/>
                
                {products}
            </div>
        );
    }
}

export default AutoShop;