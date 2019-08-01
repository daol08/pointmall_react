import React from 'react';
import ItemBox from './ItemBox';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        this.indexItems();

    }

    indexItems() {
        axios.get('http://localhost:8003/items/')
        .then((response)=> {
            const items = response.data;
            this.setState({
                items: items
            })
        });
    }


    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key= {item.id} item = {item} />
            )
        });
        return (
            <div>
                <div id= "container">
                    <div id ="item-list-container">
                        {items}
                    </div>

                </div>
            </div>
        )
    }
}

export default Home;