import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const [slots, setSlots] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:4999/api/auth')
			.then(res => {
				setSlots(res.data);
			})
			.catch(err => {
				console.error('Error fetching slots:', err);
			});
	}, []);

	const handleLogout = () => {
		logout();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className="max-w-4xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
		>
			<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
				Dashboard
			</h2>

			<div className="space-y-6">
				<motion.div
					className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
					<p className="text-gray-300">Name: {user.name}</p>
					<p className="text-gray-300">Email: {user.email}</p>
				</motion.div>

				<motion.div
					className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
					<p className="text-gray-300">
						<span className="font-bold">Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className="text-gray-300">
						<span className="font-bold">Last Login: </span>
						{formatDate(user.lastLogin)}
					</p>
				</motion.div>

				{/* Appointment Slots Table Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4 overflow-x-auto"
				>
					<h3 className="text-xl font-semibold text-green-400 mb-3">Appointment Slots</h3>
					<table className="table-auto w-full text-left border-collapse border border-gray-700 text-white">
						<thead className="text-white">
							<tr>
								<th className="border border-gray-700 px-4 py-2">Time</th>
								<th className="border border-gray-700 px-4 py-2">Status</th>
								<th className="border border-gray-700 px-4 py-2">Phone</th>
								<th className="border border-gray-700 px-4 py-2">Email</th>
							</tr>
						</thead>
						<tbody className="text-white">
							{slots.map((slot) => (
								<tr key={slot._id}>
									<td className="border border-gray-700 px-4 py-2">{slot.time}</td>
									<td className="border border-gray-700 px-4 py-2">{slot.isBooked ? 'Booked' : 'Available'}</td>
									<td className="border border-gray-700 px-4 py-2">{slot.phone || '-'}</td>
									<td className="border border-gray-700 px-4 py-2">{slot.email || '-'}</td>
								</tr>
							))}
						</tbody>
					</table>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8 }}
				className="mt-6"
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
						focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
				>
					Logout
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default DashboardPage;
