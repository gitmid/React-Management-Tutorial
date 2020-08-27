import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE' // Request Method(get,post 등)를 DELETE로 요청 
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <button onClick={(e)=> {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;