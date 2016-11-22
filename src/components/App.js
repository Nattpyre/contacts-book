import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Avatar, IconButton } from 'material-ui';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { pinkA200, } from 'material-ui/styles/colors';

import users from '../../users.json';

const ContactsList = makeSelectable(List);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      selectedContact: +this.props.params.id
    };
  }

  handleSelectContact = (e, index) => {
    this.setState({ selectedContact: +index }, () => {
      this.props.history.push(`/contact/${index}`)
    });
  };

  handleToggleFavorite = (index) => {
    const contacts = this.state.contacts;

    contacts[index].favorite = !contacts[index].favorite;

    this.setState({ contacts }, () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    });
  };

  handleEditContact = (id, data, group) => {
    const contacts = this.state.contacts;
    const index = _.findIndex(contacts, contact => contact.id === id);

    if (group) {
      Object.assign(contacts[index][group], data);
    } else {
      Object.assign(contacts[index], data);
    }

    this.setState({ contacts: _.sortBy(contacts, ['name']) }, () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    });
  };

  handleSearch = (e) => {
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts')).filter(contact => contact.name.search(e.target.value) !== -1)
    })
  };

  componentDidMount() {
    const contactsList = localStorage.getItem('contacts');

    if (contactsList) {
      return;
    }

    const sortedData = _.sortBy(users, ['name']);

    this.setState({ contacts: sortedData }, () => {
      localStorage.setItem('contacts', JSON.stringify(sortedData));
    });
  }

  render() {
    const selectedContact = _.find(this.state.contacts, { id: this.state.selectedContact });
    const children = React.Children.map(this.props.children, (item) => {
      return React.cloneElement(item, {
        contacts: this.state.contacts,
        handleEditContact: this.handleEditContact
      })
    });

    return (
      <MuiThemeProvider>
        <div>
          <header>
            <h1>Contacts Book</h1>
            <input type="search" placeholder="Search contacts..." onChange={this.handleSearch} />
          </header>
          <section>
            <div className="contacts-list">
              <ContactsList
                defaultValue={this.state.selectedContact}
                value={+this.state.selectedContact}
                onChange={this.handleSelectContact}
              >
                {this.state.contacts.length ?
                  this.state.contacts.map((contact, index) => (
                    <ListItem
                      key={contact.id}
                      value={contact.id}
                      primaryText={contact.name}
                      secondaryText={contact.email}
                      leftAvatar={<Avatar src={contact.avatar} />}
                      rightIconButton={contact.favorite ?
                        <IconButton onTouchTap={() => this.handleToggleFavorite(index)}
                                    tooltip="Remove from favorites" tooltipPosition="top-left"
                                    touch>
                          <Star color={pinkA200} />
                        </IconButton>
                        :
                        <IconButton onTouchTap={() => this.handleToggleFavorite(index)}
                                    tooltip="Add to favorites" tooltipPosition="top-left" touch>
                          <StarBorder color={pinkA200} />
                        </IconButton>}
                    />
                  ))
                  :
                  <p className="empty">No results found.</p>
                }
              </ContactsList>
            </div>
            <div className="contact-info">
              {selectedContact ?
                children
                :
                <p>Select contact to show info.</p>
              }
            </div>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
