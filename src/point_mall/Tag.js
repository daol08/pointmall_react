import React from 'react';
import ItemBox from './ItemBox';

import { inject } from 'mobx-react';

@inject('httpService')
class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        this.tagitems();

    }
    tagitems() {
        const tag =   this.props.match.params.tag;
        this.props.httpService.tagitems(tag)
        .then(items => {
            this.setState({
                items
            });
            
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

export default Tag;