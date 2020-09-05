import React, { Component, Fragment } from 'react'
import Axios from 'axios'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            datas : [],
            page : ''
        }
        console.log('constructor')
    }

    onPreviousHandle =() =>{
        console.log('tombol sebelumnya sudah di Klik')
        const url = `https://reqres.in/api/users?page=${this.state.page-1}`
        Axios
        .get(url)
        .then (response => {
            console.log('Data Berhasil didapatkan', response)
            this.setState({
                datas : response.data.data,
                page : response.data.page
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    onNextHandle =() => {
        console.log('tombol selanjutnya sudah di klik')
        const url = `https://reqres.in/api/users?page=${this.state.page+1}`
        Axios
        .get(url)
        .then (response => {
            console.log('Data Berhasil didapatkan', response)
            this.setState({
                datas : response.data.data,
                page : response.data.page
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount(){
        console.log('componentDidMount')
        const url = 'https://reqres.in/api/users?page=2'
        Axios
        .get(url)
        .then (response => {
            console.log('Data Berhasil didapatkan', response)
            this.setState({
                datas : response.data.data,
                page : response.data.page
            })
        })
        .catch(error => {
            console.log(error)
        })
        
    }
    render(){
        return(
            <Fragment>
                <div className="container mt-3 mb-3">
                    <h2 className="text-center font-weight-bold mb-3">Latihan CRUD</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-dark">
                            <th scope="col">ID</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.datas.map((data, index) => 
                                <tr key={data.id}>
                                    <th scope="row">{index+1}</th>
                                    <td><img src={data.avatar} height="50" className="rounded-circle" alt=""/></td>
                                    <td>{data.email}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex float-right">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item"><button onClick={this.onPreviousHandle} className="page-link">Previous</button></li>
                                <li className="page-item"><button onClick={this.onNextHandle} className="page-link">Next</button></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home