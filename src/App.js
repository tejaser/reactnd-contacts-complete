import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactList from "./ContactList";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    screen: "list",
    contacts: []
  };
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }
  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));
    ContactsAPI.remove(contact);
  };
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ContactList
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
              toNavigate={() => {
                this.setState({ screen: "create" });
              }}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
