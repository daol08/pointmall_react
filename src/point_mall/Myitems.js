import React from 'react';

import ItemBox from './ItemBox';

import { inject } from 'mobx-react';

@inject('authStore', 'httpService')
class Myitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            useritems: []
        }
    }

    componentDidMount() {
        this.getME();
        this.indexMyItems();
    }

    getME=()=>{
       this.props.httpService.getME()
        .then(user => {
            this.setState({
                 user
            });
        });
    }

    indexMyItems = () =>{
        this.props.httpService.indexMyItems()
        .then(useritems => {
            this.setState({
                 useritems
            });
        });

    }



    render() {
        const user = this.state.user;
        const point = user ? user.point : 0;
        const items = this.state.useritems.map((useritem)=> {
            const item = useritem.item;
            return(
                <ItemBox key= {item.id} item= {item} count = {useritem.count} />
    
            )
        });
        return(
            <div id="container">
                <h1>내 아이템 목록</h1>
                <h2>잔고: {point} P</h2>
                <div id="item-list-container">
                {items}
                </div>
            </div>
        )
       

    }

}
export default Myitems;