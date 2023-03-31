import React from 'react';
import { Jelly } from '@uiball/loaders';

const Loading: React.FC = () => {
	return (
		<div className="flex w-full items-center justify-center p-10 text-xl">
			<Jelly size={50} color="#FF4501" />
		</div>
	);
};

export default Loading;
