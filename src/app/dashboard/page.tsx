"use client";

import { useEffect, useState } from "react";
import "./_page.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/libs/hooks";
import Image from "next/image";

// COMPONENTS
import Navbar from "@/components/Navbar/navbar";
import Toast from "@/components/Toast/toast";

// ACTIONS
import { setToast } from "@/libs/slices/common-slice";

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const route = useRouter();
	const { data: session, status } = useSession();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (!session || !session.user) {
			dispatch(setToast({ type: "error", message: "User not signed in" }));
			route.replace("/");
		}

		if (session && session.user) setAuthenticated(true);
	}, [status]);

	return (
		<div className="dashboard">
			{authenticated ? (
				<>
					<Navbar />

					<Toast />
				</>
			) : (
				<div className="page__loading">
					<div className="session__loading">
						<Image src="/loading-gif.gif" quality={100} fill alt="" />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
