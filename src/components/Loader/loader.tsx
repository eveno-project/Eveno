import React from 'react';
import styles from './Loader.module.css';

export default function Loader()  {
	return (
		<div className={styles.loaderContainer}>
			<img src="/loader.svg" alt="Loading" className={styles.loaderImage}/>
			<div className={styles.loader}></div>
		</div>
	);
};
