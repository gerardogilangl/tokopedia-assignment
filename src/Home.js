import React, { Component, useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handlePokemons = this.handlePokemons.bind(this);
    this.state = {
      myPokemons: [],
      currentPage : '',
      myPokemonsBtn : true,
      offset: 0
    };
    this.handlePokemons();
  }
  
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleClick(name) {
    fetch("https://pokeapi.co/api/v2/pokemon/"+name)
      .then(results => {return results.json();})
      .then(data => {
        console.log(data)
        const sprite = data.sprites.front_default;
        let pokemons = data.abilities.map(pokemon => {
          // const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.url.split("/")[6]+".png";
          return (
            <div className="col-md-4 col-6 p-1">
              <div className="btn btn-primary pokemon w-100" key={pokemon.ability.name}>{pokemon.ability.name}</div>  
            </div>);
        });

        this.setState(() => {
          return {
            pokemons: pokemons,
            title: this.Capitalize(name),
            sprite: sprite,
            currentPage: name
          };
        });
      });
  }

  handleNextClick() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+(this.state.offset+20))
      .then(results => {return results.json();})
      .then(data => {
        console.log(data);
        let pokemons = data.results.map(pokemon => {
          const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.url.split("/")[6]+".png";
          return (
            <div className="col-md-4 col-12 p-1">
              <div className="btn btn-primary pokemon w-100 d-flex justify-content-start align-items-center" key={pokemon.name} onClick={() => this.handleClick(pokemon.name)}>
                <img src={sprite} alt="new"/>
                <span className="">{this.Capitalize(pokemon.name)}</span>
              </div>
            </div>);
        });

        this.setState(() => {
          return {
            pokemons: pokemons,
            title: this.Capitalize("Pokemon List")
          };
        });
      });

      this.setState({offset: this.state.offset+20});
  }

  handlePrevClick() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+(this.state.offset-20))
      .then(results => {return results.json();})
      .then(data => {
        console.log(data);
        let pokemons = data.results.map(pokemon => {
          const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.url.split("/")[6]+".png";
          return (
            <div className="col-md-4 col-12 p-1">
              <div className="btn btn-primary pokemon w-100 d-flex justify-content-start align-items-center" key={pokemon.name} onClick={() => this.handleClick(pokemon.name)}>
                <img src={sprite} alt="new"/>
                <span className="">{this.Capitalize(pokemon.name)}</span>
              </div>
            </div>);
        });

        this.setState(() => {
          return {
            pokemons: pokemons,
            title: this.Capitalize("Pokemon List")
          };
        });
      });

      this.setState({offset: this.state.offset-20})
  }

  handlePokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+this.state.offset)
      .then(results => {return results.json();})
      .then(data => {
        console.log(data);
        let pokemons = data.results.map(pokemon => {
          const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon.url.split("/")[6]+".png";
          return (
            <div className="col-md-4 col-12 p-1">
              <div className="btn btn-primary pokemon w-100 d-flex justify-content-start align-items-center" key={pokemon.name} onClick={() => this.handleClick(pokemon.name)}>
                <img src={sprite} alt="new"/>
                <span className="">{this.Capitalize(pokemon.name)}</span>
              </div>
            </div>);
        });

        this.setState(() => {
          return {
            pokemons: pokemons,
            title: this.Capitalize("Pokemon List"),
            sprite: null,
            myPokemonsBtn: true,
          };
        });
      });
  }

  handleMyPokemons() {
    this.setState({ myPokemonsBtn: false })
    let pokemons = this.state.myPokemons.map(pokemon => {
        return (
          <div className="col-md-4 col-12 p-1">
            <div className="btn btn-primary pokemon w-100 d-flex justify-content-start align-items-center" key={pokemon} onClick={() => this.handleClick(pokemon)}>
              <span className="">{this.Capitalize(pokemon)}</span>
            </div>
          </div>);
    });

    this.setState(() => {
      return {
        pokemons: pokemons,
        title: this.Capitalize("My Pokemons"),
        sprite: null
      };
    });
  }

  handleCatch() {
    var myPokemons = this.state.myPokemons.concat(this.state.currentPage);
    this.setState({ myPokemons: myPokemons })
  }

  render() {
    return (
      <div>
        {this.state.myPokemonsBtn ? <div className="fw-bold btn btn-dark pb-2 mb-2 col-12" onClick={() => this.handleMyPokemons()}>My Pokemons</div> : ''}
        <h5 className="fw-bold border-bottom border-dark pb-2">{this.state.title}</h5>
        <div className="containter">
          <div className="row px-3">
            {this.state.sprite ? <img className="col-12 col-md-6" src={this.state.sprite} alt="new"/> : ''}
            {this.state.sprite ? <h5 className="px-0 pb-2 col-12 fw-bold border-bottom border-dark">Abilities</h5> : ''}
            {/*{pokemons.map(pokemon => (
              <div key={pokemon.name} className="">
                <div className="btn btn-primary w-100">{pokemon.name}</div>
              </div>
            ))}*/ 
              this.state.pokemons
            }
            {this.state.sprite ? <h5 className="px-0 pb-2 col-12 fw-bold border-bottom border-dark">Menu</h5> : ''}
            {this.state.sprite ? <button className="btn btn-success col-12 px-1 mb-1" onClick={() => this.handleCatch()}>Catch</button> : ''}
            {this.state.sprite ? '' : <div className="col-6 px-0 pe-1"><button className="btn btn-secondary w-100" onClick={() => this.handlePrevClick()}>Prev</button></div>}
            {this.state.sprite ? '' : <div className="col-6 px-0 ps-1"><button className="btn btn-secondary w-100" onClick={() => this.handleNextClick()}>Next</button></div>}
            <button className="btn btn-dark col-12 px-1 mt-1" onClick={() => this.handlePokemons()}>Pokemon List</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

function nextPage() {
  console.log('asd');
  // offset += 20;
}
