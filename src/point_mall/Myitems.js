import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';


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
        axios.get('http://localhost:8003/me', {
            headers: {
                'Authorization' : localStorage.getItem('authorization')
            }
        }).then((response) => {
            const user = response.data;
            this.setState({
                user: user
            });
        });
    }

    indexItems = () =>{
        axios.get('http://localhost:8003/me/items', {
            headers: {
                'Authorization' : localStorage.getItem('authorization')
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