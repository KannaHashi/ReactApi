import React, { Component, Fragment } from "react";
import Axios from "axios";
import "./../styles.css";
import AddEditUser from "./Modal/AddEditUser";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      per_page: "5",
      current_page: "",
      total_pages: "",
      search: "",
      userId: ""
    };
    console.log("constructor");
  }

  onPreviousHandle = () => {
    console.log("tombol sebelumnya sudah di Klik");
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${
      this.state.per_page
    }?page=${this.state.current_page - 1}`;
    Axios.get(url)
      .then((response) => {
        console.log("Data Berhasil didapatkan", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages
        });
        console.log(
          "Anda berada di data yang ke-",
          response.data.meta.current_page
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onNextHandle = () => {
    console.log("tombol selanjutnya sudah di klik");
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${
      this.state.per_page
    }?page=${this.state.current_page + 1}`;
    Axios.get(url)
      .then((response) => {
        console.log("Data Berhasil didapatkan", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages
        });
        console.log(
          "Anda berada di data yang ke-",
          response.data.meta.current_page
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  change = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
    console.log("Value", keyword);
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${event.target.value}`;
    Axios.get(url)
      .then((response) => {
        console.log("Select item", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages,
          search: keyword
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSelectItem = (event) => {
    console.log("Value", event.target.value);
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${event.target.value}`;
    Axios.get(url)
      .then((response) => {
        console.log("Select item", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("componentDidMount");
    const url = `https://belajar-react.smkmadinatulquran.sch.id/api/users/${this.state.per_page}`;
    Axios.get(url)
      .then((response) => {
        console.log("Data Berhasil didapatkan", response);
        this.setState({
          datas: response.data.data,
          per_page: response.data.meta.per_page,
          current_page: response.data.meta.current_page,
          total_pages: response.data.meta.total_pages
        });
        console.log(
          "Anda berada di data yang ke-",
          response.data.meta.current_page
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Fragment>
        <div className="container mt-3 mb-3">
          <h2 className="text-center alert alert-info font-weight-bold my-3">
            Latihan CRUD
          </h2>
          <div className="row">
            <div className="col-3">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Tambah Data
              </button>
            </div>
            <div className="col-6"></div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="cari"
                id="cari"
                placeholder="masukkan"
                onChange={this.change}
              />
            </div>
            <div className="col-1 col-sm-1 col-md-1 col-lg-1 mb-3 float-right">
              <select
                onChange={this.onSelectItem}
                className="form-select px-3 py-2 rounded"
              >
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12-lg">
              <table className="table">
                <thead className="thead-dark">
                  <tr className="table-primary">
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.datas
                    .filter(
                      (data) =>
                        data.name
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase()) ||
                        data.email
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase()) ||
                        data.username
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase())
                    )
                    .map((data, index) => (
                      <tr key={data.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            value={data.id}
                            onClick={(e) => {
                              this.setState({
                                userId: data.id
                              });
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex float-right">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button onClick={this.onPreviousHandle} className="page-link">
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button onClick={this.onNextHandle} className="page-link">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* Modals */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <AddEditUser userId={this.state.userId} />
            </div>
          </div>
        </div>
        {/* Akhir Modal */}
      </Fragment>
    );
  }
}

export default Home;
