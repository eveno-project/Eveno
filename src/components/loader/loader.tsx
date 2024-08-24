import Image from 'next/image';
import React from 'react';

import styles from './loader.module.css';
import { Box } from '@mui/material';

export default function Loader() {
	return (
		<Box component="section" className={styles.loader__image}>
			<Image alt="logo" src="/fou/classic.svg" width={64} height={64} />
		</Box>
	);
};
