import React from 'react';

class PromiseTest extends React.Component {
    callback(func) {
        for (let i =0; i< 10; i ++) {
             func(i);
        }
       
    }
    
    callbackTest=()=> {
        const callbackFunc = function(i) {
            console.log('callback' + i );

        };
        this.callback(callbackFunc);
    }
    PromiseTest = () => {
             
        const promise = new Promise((resolve, reject) => {
            let a =1 ;
            const b =2;
            resolve(a+b);
            console.log('after resolve');
          });
          promise.then((result) =>{
              console.log('promise then' + result);

          }).then(()=>{
              console.log()

          }).catch(()=> {
              console.log('promise catch');
          })
        
        
        }
    
    render() {
        return(
            <div>
                <h1>하하하</h1>
                <button onClick={this.callbackTest}>callback</button>
                <button onClick={this.PromiseTest}>Promise</button>
            </div>
        )
    }
}
export default PromiseTest;