import React, { Component } from "react";
import styles from "./ContactForm.module.css";
import PropTypes from "prop-types";

export default class ContactForm extends Component {
  static defaultProps = {
    onAddButton: () => {
      return;
    },
  };

  static propTypes = {
    onAddButton: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    number: "",
  };

  clearInput = (e) => {
    e.target.value = "";
  };

  inputHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  addButtonHandler = (e) => {
    e.preventDefault();
    this.props.onAddButton({ ...this.state });
  };

  render() {
    return (
      <form>
        <div className={styles.input}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Input name"
            name="name"
            onChange={this.inputHandler}
            onClick={this.clearInput}
          />
          <p>Phone</p>
          <input
            type="tel"
            placeholder="Input number"
            name="number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
            onChange={this.inputHandler}
            onClick={this.clearInput}
          />
        </div>
        <button
          className="button"
          type="submit"
          onClick={this.addButtonHandler}
        >
          Add Contact
        </button>
      </form>
    );
  }
}
