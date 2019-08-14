import axios from 'axios';
import {reaction} from 'mobx';


class HttpService {
    constructor(rootstore) {
        this.rootstore = rootstore;
        this.authStore = rootstore.authStore;

        this.clientId = 'e2H3CDchv5sC1XCqywuHldkz0wfhPv24Yo0dcTXz'
        this.refreshSubscriber = [];
        this.isRefreshingToken = false;
        axios.defaults.baseURL = 'http://localhost:8003';
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken; 
        reaction(()=> this.authStore.authToken, ()=> {
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken; 
        });
        
        axios.interceptors.response.use(response => {

            return response;

        }, originalError => {

            const { config, response } = originalError;

            const originalRequest = config;

            if (originalError.response.status === 401){

                if (this.authStore.refresh_token == null) {

                    alert('로그인이 필요한 서비스입니다.');
                    this.rootstore.history.push('/login');

                } else {
                    if (!this.isRefreshingToken) {
                        this.isRefreshingToken = true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token => {
                                originalRequest.headers.Authorization = this.authStore.authToken
                                resolve(axios(originalRequest));
                                for(let subscriber of this.refreshSubscriber){
                                    subscriber(token)
                                }
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);
                                alert('로그인이 필요한 서비스입니다');
                                this.rootstore.history.push('/login');
                                for(let subscriber of this.refreshSubscriber){
                                    subscriber(null);
                                }
                            }).finally(()=> {
                                this.refreshSubscriber = [];
                                this.isRefreshingToken = false;
                            })
                        });
                    }

                    return new Promise((resolve, reject) => {

                            this.refreshSubscriber.push((token)=> {
                                if(token == null){
                                    reject(originalError);
                                } else {
                                    originalRequest.headers.Authorization = this.authStore.authToken
                                    resolve(axios(originalRequest));
                                }
                                resolve(123);
                            })

                    })

                }

            }

            return Promise.reject(originalError);

        })
    
    }
        


    indexItems() {
        return axios.get('/items/')
        .then((response) => {
            return response.data;
        })
    }

    getME() {
        return axios.get( '/me/',
    ).then(response => {
        return response.data;
    })
    }

    indexMyItems() {
        return axios.get('/me/items/' ).then(response => {
            return response.data;
        })
    }

    purchaseItems(items){

        return axios.post('/items/purchase/', {items}

        ).then((response) => {

            return response.data

        })

        .catch(error => {

            if (error.response.status === 401) {

                alert('로그인이 필요한 서비스입니다.')

            }

        });

    }

    indexCategoryItems(categoryId) {
       return axios.get( '/categories/'+ categoryId +'/items')
       .then(response => {
        return response.data;
    })

    }

    
    indexcategoies() {
        return axios.get(  '/categories/', {
        }).then(response => {
            return response.data;
        })
    }

    getItem(itemId) {
        return axios.get('/items/' + itemId).then(response => {
            return response.data;
        })
    }

    perchaseItem(itemId) {
       return axios.post(
            '/items/' +itemId + '/purchase/',
           ).then(response => {
                return response.data;
            })
    
        }

    register(username, password) {
       return axios.post('/users/',
        {
            username,
            password
        }).then(response => {
            return response.data;
        })
    }

    login(username, password) {
        return  axios.post('/o/token/',
        {
            grant_type : "password",
            client_id: this.clientId,
            username,
            password
        }).then(response => {
            const token = response.data;
            this.authStore.setToken(token)
            return token;
        })

    }

    refreshToken(){

        return axios.post('/o/token/',

        {

            grant_type : "refresh_token",

            client_id : this.clientID,

            refresh_token : this.authStore.refresh_token

        })

        .then((response) => {

            const token = response.data;

            this.authStore.setToken(token)

            return token;

        });

    }
    
}
export default HttpService;