import React from 'react';
import styles from './Notification.module.css';

export default function Notification() {
    return (
        <div className={styles.container}>
            <p>Contact already exists!</p>
        </div>
    )
}