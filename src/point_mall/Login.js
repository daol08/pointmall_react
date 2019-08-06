import React from 'react';
import axios from 'axios';
import DataHelper from './Datahelper';
import { inject } from 'mobx-react';



@inject('authStore')
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            username: 'daol',
            password:'daol3545'
        };
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        } else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }


    login=()=> {
        axios.post(  DataHelper.baseURL() +'/o/token/',
        {
            grant_type : "password",
            client_id: "v33J35aNZNv5EEa2VCTiUsD4BSPJv3e9752lpBQ9",
            username: this.state.username,
            password: this.state.password
        })
        .then((response)=>{
            const token = response.data;
            const { authStore, history }  = this.props;
            this.props.authStore.setToken(token);
            DataHelper.setAuthToken(token);
            this.props.history.push('/');
        });
       
    }

    render() {
        return (
            <div>
                <div id ="container">
                    <p>
                        <label>아이디</label>
                        <input type="text" value={this.state.username}
                        onChange={this.onInputChanged} name='username'  />
                    </p>
                    <p>
                        <label>비밀번호</label>
                        <input type="password" value={this.state.password}
                        onChange={this.onInputChanged} name='password' />
                    </p>
                    <button onClick={this.login}> 로그인 </button>
                </div>
            </div>
        );
    }

}

export default Login;