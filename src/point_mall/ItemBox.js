import React from 'react';
import { withRouter } from 'react-router-dom';


class ItemBox extends React.Component {
    goToitem =() => {
        const item = this.props.item;
        this.props.history.push('/items/' + item.id);
    }
  
    render() {
        const item = this.props.item;
        const count = this.props.count;
        let image = item.image;
       
        return (
            <div className="item-container" onClick={this.goToitem} >
                       
            <img src={image} alt="" />
            <p className="item-title">{item.title}</p>
            <p className="item-price"> 
                {count == null ?
                '가격: ' + item.price + 'P':
                '개수: ' + count}
            </p> 
            </div>
        )
    }

}

export default withRouter(ItemBox);