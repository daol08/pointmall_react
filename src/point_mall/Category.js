import React from 'react';
import ItemBox from './ItemBox';
import axios from 'axios';
import DataHelper from './Datahelper';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        this.indexItems();

    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
          this.indexItems()
        };
      }

    indexItems() {
        const categoryId = this.props.match.params.categoryId;
        axios.get( DataHelper.baseURL()+ '/categories/'+ categoryId +'/items')
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
        )};

        
          
    }

export default Category;