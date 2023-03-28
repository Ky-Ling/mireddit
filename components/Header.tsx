import Image from 'next/image';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaChevronDown } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { AiFillHome, AiOutlinePlus, AiOutlineMenu } from 'react-icons/ai';
import { GrGlobe } from 'react-icons/gr';
import { BsCameraVideo, BsChatDots, BsBell } from 'react-icons/bs';
import { RxSpeakerLoud } from 'react-icons/rx';
import { GiSparkles } from 'react-icons/gi';

const Header: React.FC = () => {
	const { data: session } = useSession();

	return (
		<div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
			<div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
				<Image
					style={{
						objectFit: 'contain',
					}}
					src="https://download.logo.wine/logo/Reddit/Reddit-Logo.wine.png"
					fill
					alt="logo"
					priority
				/>
			</div>
			<div className="flex items-center mx-7 xl:min-w-[300px]">
				<AiFillHome className="h-5 w-5 cursor-pointer" />
				<p className="flex-1 ml-2 hidden lg:inline cursor-pointer">Home</p>
				<FaChevronDown className="h-5 w-5 cursor-pointer" />
			</div>

			<form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
				<BiSearch className="h-6 w-6 text-gray-400" />
				<input
					className="flex-1 bg-transparent outline-none"
					type="text"
					placeholder="Search Reddit"
				/>
				<button hidden type="submit" />
			</form>

			<div className=" text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex">
				<GiSparkles className="icon" />
				<GrGlobe className="icon" />
				<BsCameraVideo className="icon" />
				<hr className="h-10 border border-gray-100" />
				<BsChatDots className="icon" />
				<BsBell className="icon" />
				<AiOutlinePlus className="icon" />
				<RxSpeakerLoud className="icon" />
			</div>

			<div className="ml-5 flex items-center lg:hidden">
				<AiOutlineMenu className="icon" />
			</div>

			{session ? (
				<div
					onClick={() => signOut()}
					className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
				>
					<div className="relative h-5 w-5 flex-shrink-0">
						<Image
							style={{ objectFit: 'contain' }}
							src="https://links.papareact.com/23l"
							fill
							alt="auth"
						/>
					</div>
					<div className="flex-1 text-xs">
						<p className="truncate">{session?.user?.name} </p>
						<p className="text-gray-400">1 Karma</p>
					</div>
					<FaChevronDown className="h-5 flex-shrink-0 text-gray-400" />
				</div>
			) : (
				<div
					onClick={() => signIn()}
					className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
				>
					<div className="relative h-5 w-5 flex-shrink-0">
						<Image
							style={{ objectFit: 'contain' }}
							src="https://links.papareact.com/23l"
							fill
							alt="auth"
						/>
					</div>
					<p className="text-gray-400">Sign In</p>
				</div>
			)}
		</div>
	);
};

export default Header;
