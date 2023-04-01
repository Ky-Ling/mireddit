import React from 'react';
import { useSession } from 'next-auth/react';
import { ReactSVG } from 'react-svg';

interface AvatarProps {
	seed?: string;
	large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ seed, large }) => {
	const { data: session } = useSession();

	return (
		<div
			className={`relative h-10 w-10 overflow-hidden border-gray-300 bg-white ${
				large ? 'h-20 w-20 rounded-full' : 'rounded-full'
			}`}
		>
			<ReactSVG
				preserveAspectRatio="none"
				width="100%"
				height="100%"
				src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${
					seed || session?.user?.name || 'Placeholder'
				}
				`}
			/>
		</div>
	);
};

export default Avatar;
