import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>@@@</span>
                <br />
                Not Found Real
            </h1>
            <p className={styles.description}>sorry this page is empty</p>
        </div>
    );
};

export default NotFoundBlock;
