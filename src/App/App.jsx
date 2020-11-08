import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import Logo from "../Logo/Logo";
import Notification from "../Notification/Notification";

import LogoSlideTransition from "../CSSTransitions/slideLogo.module.css";
import PopTransition from "../CSSTransitions/pop.module.css";

import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    didMount: false,
    contactExists: false,
  };

  componentDidMount() {
    this.setState({ didMount: true });

    const savedUsers = localStorage.getItem("contacts");

    if (savedUsers) {
      this.setState({
        contacts: JSON.parse(savedUsers),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    const newContact = {
      ...contact,
      id: uuidv4(),
    };

    const { contacts } = this.state;

    const isInContacts = contacts.some((contact) =>
      contact.name.includes(newContact.name)
    );

    isInContacts
      ? this.setState(
          (prevState) => ({
            contactExists: !prevState.contactExists,
          }),
          () =>
            setTimeout(() => {
              this.setState((prevState) => ({
                contactExists: !prevState.contactExists,
              }));
            }, 1000)
        )
      : this.setState((prevState) => {
          const { contacts } = prevState;

          const newContactsArr = [...contacts, newContact];

          return { contacts: newContactsArr };
        });
  };

  filterHandler = (e) => {
    const { value } = e.target;

    this.setState({
      filter: value,
    });

    this.filterUpdater();
  };

  filterUpdater = () => {
    const { filter, contacts } = this.state;

    if (filter.length === 0) {
      return;
    }
    const filteredArray = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredArray;
  };

  deleteButtonHandler = (id) => {
    this.setState((prevState) => {
      const { contacts } = prevState;

      const newContactsArr = contacts.filter((contact) => contact.id !== id);

      return { contacts: newContactsArr };
    });
  };

  render() {
    const { contacts, filter, didMount, contactExists } = this.state;

    const listArray = filter.length === 0 ? contacts : this.filterUpdater();

    return (
      <>
        <div className="App">
          <CSSTransition
            in={didMount}
            timeout={500}
            classNames={LogoSlideTransition}
            appear
          >
            <Logo />
          </CSSTransition>

          <ContactForm onAddButton={this.addContact} />

          <h2 className="contactsTitle">Contacts</h2>

          <Filter filterHandler={this.filterHandler} />
          <ContactList
            contactsList={listArray}
            deleteHandler={this.deleteButtonHandler}
          />
        </div>

        <CSSTransition
          in={contactExists}
          timeout={250}
          unmountOnExit
          classNames={PopTransition}
        >
          <Notification />
        </CSSTransition>
      </>
    );
  }
}

export default App;
