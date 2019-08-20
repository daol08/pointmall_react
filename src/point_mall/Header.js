import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';

@inject('authStore', 'itemStore', 'httpService','history')
@observer
class Header extends React.Component {
 
    constructor(props) {
        super(props);

        
        this.state = {
            searchtext: '',
            categories: []
        };
        
       
    }



    componentDidMount() {
        this.indexcategoies();
      
      
      }

    
      onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'search') {
            this.setState({
                searchtext: target.value
            });
        } 
    }

    search = () =>{
        this.props.history.push('/tags/' + this.state.searchtext);

    }

    
    
    indexcategoies() {
        this.props.httpService.indexcategoies()
        .then(categories => {
         
            this.setState({
                 categories
            });
        });
    }

    logout =() => {
        const { authStore } = this.props; 
        authStore.deleteToken();
    }

    render() {
        const { authStore, itemStore } = this.props;
                
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
                <Link to = "/cart/items">Cart{itemStore.cartItemsCount}</Link>
                {
                      authStore.isLoggedIn && <Link to = '/history'>History</Link>

                }
                {
                    authStore.isLoggedIn ?  <Link to ='/me/items'>My Items</Link>:
                    <Link to='/register'>Register</Link>
                }
                { 
                
                
                    authStore.isLoggedIn ?
                    <button onClick={this.logout}>Logout</button> :
                    <Link to = "/login">Login</Link>
                   
            
            }
            <input type='text'
            name='search'
            style= {{marginLeft: '1em'}}
            value = {this.state.searchtext}
            onChange={this.onInputChanged}/>
           <button onClick={this.search}>search</button>
            </div>
           
            
        </header>
        )
    }




}



export default Header;