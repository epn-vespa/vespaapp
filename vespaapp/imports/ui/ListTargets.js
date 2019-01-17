import { Meteor } from 'meteor/meteor';
import React from 'react';

// import './ListTargets.css';

/*
ListTargets will list all the abailable targets in Data database/collection.
This component should also provide a search engine to easily access targets
and also to search for content _inside_ the target items.
For example, "Mars" is a target (of type "planet") and has named geological
formations, like "Arabia Terra"
*/
class ListTargets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: []
    }
  }

  render() {
    return (
      <div id="searchable-list" className="col-6">
        <div className="search-box">
          {this.renderSearchBox()}
        </div>
        <div className="list-targets">
          {this.renderList()}
        </div>
      </div>
    );
  }

  renderSearchBox() {
    return (
      <div className="search-box">
              <div className="col">
                  <input id="searchInput" className="form-control"
                    type="text"
                    onChange={this.filterItems.bind(this)}
                    placeholder="Search targets"
                  />
              </div>
      </div>
    )
  }

  filterItems(event) {
    const text = event.target.value.toLowerCase();
    this.setState({ query: text });
    var filteredList = this.props.items;
    if (text) {
      filteredList = filteredList.filter((item) => {
        return item.name.toLowerCase().search(text) !== -1;
      });
    }
    this.setState({items: filteredList});
  }

  renderList() {
    return (
      <ul>
        {this.renderItems()}
      </ul>
    );
  }

  renderItems() {
    // hack to work around empty list at the very beginning
    var items = !(this.state.query || this.state.items.length)
                    ? this.props.items
                    : this.state.items;
    return items.map((item) => {
      //TODO: put a mapping here to properly route the user
      const itemPage = "/" + item.name.toLowerCase();
      return (
        <div className="row" key={item.name}>
          <a href={itemPage} className="card-body">
            <div className="card">
              <img style={{width:'100px'}} src={item.thumbnail} alt={item.name}/>
              <div className="contentTargets">
                <h3>{item.name}</h3>
              </div>
            </div>
          </a>
        </div>
      );
    });
  }
}
export default ListTargets;
