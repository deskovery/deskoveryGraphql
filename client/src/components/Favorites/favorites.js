import React, {Component} from "react"
import ls from 'local-storage'
import { renderGraphiQL } from "apollo-server-module-graphiql";
//import ControlledPopup from '../components/popup'

// var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// // add class 'fav' to each favorite
// favorites.forEach(function(favorite) {
//   document.getElementById(favorite).className = 'fav';
// });
// // register click event listener
// document.querySelector('.list').addEventListener('click', function(e) {
//   var id = e.target.id,
//       item = e.target,
//       index = favorites.indexOf(id);
//   // return if target doesn't have an id (shouldn't happen)
//   if (!id) return;
//   // item is not favorite
//   if (index == -1) {
//     favorites.push(id);
//     item.className = 'fav';
//   // item is already favorite
//   } else {
//     favorites.splice(index, 1);
//     item.className = '';
//   }
//   // store array in local storage
//   localStorage.setItem('favorites', JSON.stringify(favorites));
// });

class Favorites extends Component {
  constructor(props) {
    super (props)
  }
  // this.state = {
  //   video: []
  // }

  render() {
    console.log(localStorage.items, 'local storage in favorites')
    // console.log(localStorage.split(''), "split")



    let items = localStorage.getItem("items");
    console.log(items)
    console.log(localStorage, "locall")
    let items2= JSON.parse(items)
    console.log(items2, "ITEMMMMM")

    return (
      // <h1>HELLO</h1>
      <div className = 'favorites'>
      <ul className='faveItemList'>
        {items2.map(item => {
          return (
            <li key={item.id}>{item}</li>
          )
        })}
        </ul>
        </div>
    )
  }

}
export default Favorites
