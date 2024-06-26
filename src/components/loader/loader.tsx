import Image from 'next/image';
import React from 'react';

import style from './loader.module.css';

export default function Loader() {
	return (
		<div className={style.loader__image}>
			<Image alt="logo" src="/fou/classic.svg" width={64} height={64} />
		</div>
	);
};
