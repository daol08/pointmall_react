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
        axios.interceptors.response.use(response=>{
            return response;
        }, originalError => {
            const {config, response} = originalError;
            const originalRequest = config;
            if(response.status == 401) {
                if(this.authStore.refresh_token != null){
                    if(!this.isRefreshingToken) {
                        this.isrefreshingToken= true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token=> {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                axios(originalRequest).then(response => {
                                    resolve(response);
                                }).catch(error => {
                                    reject(error);
                                });
                                for( let subscriber of this.refreshSubscriber) {
                                    subscriber(token);
                                }
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);                             
                            }).finally(() => {
                                this.isRefreshingToken = false;
                                this.refreshSubscriber = [];
                            });
                        });
                    }
                    return new Promise((resolve, reject) => {
                        this.refreshSubscriber.push(token => {
                            if(token == null) {
                                reject(originalError);
                            }else {
                                originalRequest.headers.Authorization = this.authStore.authToken;
                                axios(originalRequest).then(response => {
                                    resolve(response);
                                }).catch(error => {
                                    reject(error);
                                });
                            }
                        });
                    });
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

            client_id : this.clientId,

            refresh_token : this.authStore.refresh_token

        })

        .then((response) => {

            const token = response.data;

            this.authStore.setToken(token)

            return token;

        });

    }

    IndexHistory(){
        return axios.get('/history/')
        .then(response=> {
            return response.data;
        })
    }
    
    refundHistory(historyId) {
        return axios.post('/history/' + historyId + '/refund/')
        .then(response => {
            return response.data;
        });
    }
}

export default HttpService;