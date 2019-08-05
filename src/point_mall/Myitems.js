import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';
import DataHelper from './Datahelper';

class Myitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            useritems: []
        }
    }

    componentDidMount() {
        this.getUser();
        this.indexItems();
    }

    getUser=()=>{
        axios.get( DataHelper.baseURL()+'/me', {
            headers: {
                'Authorization' : DataHelper.getAuthToken()
            }
        }).then((response) => {
            const user = response.data;
            this.setState({
                user: user
            });
        });
    }

    indexItems = () =>{
        axios.get( DataHelper.baseURL() +'/me/items', {
            headers: {
                'Authorization' : DataHelper.getAuthToken()
            }
        }).then((response) => {
            const useritems = response.data;
            this.setState({
                useritems: useritems
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