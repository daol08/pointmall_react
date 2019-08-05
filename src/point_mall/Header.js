import React from 'react';
import { Link } from 'react-router-dom';
import Myitems from './Myitems';
import axios from 'axios';
import DataHelper from './Datahelper';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.indexcategoies();  
      }


    indexcategoies() {
        axios.get(  DataHelper.baseURL() + '/categories/', {
        }).then((response) => {
            const categories = response.data;
            this.setState({
                categories: categories
            });
        });
    }

    render() {
                const categories = this.state.categories.map((category) => {
            return (
                <Link key= {category.id} to={'/categories/'+ category.id}>{category.title}</Link>
            )
        });
        return(
            <header>
            <Link to ='/'>PointMall</Link>
            {categories}
            <div className = "header-right">
                <Link to = "/cart/items">Cart</Link>
                <Link to = "/login">Login</Link>
            </div>
            <div>
                <Link to ='/me/items'>My Items</Link>
                   
            </div>
        </header>
        )
    }




}



export default Header;