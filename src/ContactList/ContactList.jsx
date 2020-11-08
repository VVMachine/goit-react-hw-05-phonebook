import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import slideTransition from "../CSSTransitions/slide.module.css";

export default function ContactList({ contactsList, deleteHandler }) {
  return (

    <TransitionGroup component="ul" className={styles.list}>
      {contactsList.map(({ id, name, number }) => (
        <CSSTransition
          key={id}
          timeout={250}
          unmountOnExit
          classNames={slideTransition}
        >
          <li key={id}>
            <button
              className={styles.button}
              type="button"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </button>
            {name}: {number}
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactList.defaultProps = {
  contactsList: [],
  deleteHandler: () => {
    return;
  },
};

ContactList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
