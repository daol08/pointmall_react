import axios from 'axios';
import {reaction} from 'mobx';

class HttpService {

   constructor(rootStore) {
       this.rootStore = rootStore;
       this.authStore = rootStore.authStore;
       this.isrefreshToken = false;

       axios.defaults.baseURL = 'http://localhost:8003';
       axios.defaults.headers.common['Authorization'] =  this.authStore.authToken;
       reaction(()=> this.authStore.authToken, () => {

        axios.defaults.headers.common['Authorization'] = this.authStore.authToken; 

    });
}

   login(username, password) {
    return axios.post( '/o/token/',
    {
        grant_type : "password",
        client_id: "v33J35aNZNv5EEa2VCTiUsD4BSPJv3e9752lpBQ9",
        username,
        password
    }).then(response => {
        const token = response.data;
        this.authStore.setToken(token);
        return token;


    })
    }

    purchaseItems(items) {
       return axios.post(
            '/items/purchase/',
            {
                items
            },).then(response => {
                return response.data;
            })

    } 

    indexCategoryItems(categoryId) {
        
        return axios.get( '/categories/'+ categoryId +'/items')
        .then(response => {
            return response.data;
            
        })
    }

    indexcategoies() {
       return axios.get( '/categories/', {
        }).then(response => {
            return response.data;
        })

    }

    
    indexItems() {
        return axios.get( '/items/')
        .then(response => {
            return response.data;
        })


    }

    getItem(itemId) {
        
        return axios.get('/items/' + itemId)
        .then(response => {
            return response.data;
        })

    }


    
    purchase(itemId) {
        return axios.post(
             '/items/' +itemId + '/purchase/',
            {},
           
        ).then(response => {
            return response.data;
        })
    }
    getUser(){
       
        return axios.get('/me') 
        .then(response => {
            return response.data;
        })

    }

    indexmyItems() {
        
        return axios.get('/me/items')
        .then(response => {
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


}
export default HttpService;