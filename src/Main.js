import React, { Component } from "react";
import {
  HashRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
 
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="bg bg-white">
          <div className="shadow bg-body">
            <h1 className="px-3 text-dark fw-bold mb-0"><span className="text-success">Tokopedia</span> Pokemon</h1>
            <div className="bg bg-white row p-2 w-100 m-0">
              <div className="col-3 col-md-1"><NavLink className="text-decoration-none fw-bold text-dark p-0 ps-2" to="/">Home</NavLink></div>
              <div className="col-4 col-md-1"><NavLink className="text-decoration-none fw-bold text-dark p-0 ps-2" to="/stuff">MyPokemons</NavLink></div>
              <div className="col-4 col-md-1"><NavLink className="text-decoration-none fw-bold text-dark p-0 ps-2" to="/contact">Contact</NavLink></div>
            </div>
          </div>
          <div className="content pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="stuff" element={<Stuff />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;