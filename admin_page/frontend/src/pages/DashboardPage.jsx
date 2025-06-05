import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';
import { Button } from '../components/ui/button';
import AppointmentForm from '../components/AppointmentForm';
import { 
	Calendar, 
	Clock, 
	User, 
	Mail, 
	Phone, 
	Activity, 
	Plus, 
	LogOut, 
	ChevronLeft, 
	ChevronRight,
	Search,
	Filter,
	MoreVertical,
	CheckCircle2,
	Clock4,
	AlertCircle,
	XCircle
} from 'lucide-react';

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const [appointments, setAppointments] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [formMode, setFormMode] = useState('create');
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');

	useEffect(() => {
		fetchAppointments();
	}, [selectedDate]);

	const fetchAppointments = async () => {
		try {
			const response = await axios.get('http://localhost:4999/api/appointments', {
				withCredentials: true
			});
			const filteredAppointments = response.data.filter(appointment => {
				const appointmentDate = new Date(appointment.appointmentDate).toISOString().split('T')[0];
				return appointmentDate === selectedDate;
			});
			setAppointments(filteredAppointments);
		} catch (error) {
			console.error('Error fetching appointments:', error);
		}
	};

	const handleDateChange = (days) => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + days);
		setSelectedDate(newDate.toISOString().split('T')[0]);
	};

	const handleCreateAppointment = async (data) => {
		try {
			await axios.post('http://localhost:4999/api/appointments', data, {
				withCredentials: true
			});
			fetchAppointments();
			setIsFormOpen(false);
		} catch (error) {
			console.error('Error creating appointment:', error);
		}
	};

	const handleUpdateAppointment = async (data) => {
		try {
			await axios.put(`http://localhost:4999/api/appointments/${selectedAppointment._id}`, data, {
				withCredentials: true
			});
			fetchAppointments();
			setIsFormOpen(false);
			setSelectedAppointment(null);
		} catch (error) {
			console.error('Error updating appointment:', error);
		}
	};

	const handleStatusChange = async (appointmentId, newStatus) => {
		try {
			await axios.put(`http://localhost:4999/api/appointments/${appointmentId}`, {
				status: newStatus
			}, {
				withCredentials: true
			});
			fetchAppointments();
		} catch (error) {
			console.error('Error updating appointment status:', error);
		}
	};

	const handleEdit = (appointment) => {
		setSelectedAppointment(appointment);
		setFormMode('edit');
		setIsFormOpen(true);
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this appointment?')) {
			try {
				await axios.delete(`http://localhost:4999/api/appointments/${id}`, {
					withCredentials: true
				});
				fetchAppointments();
			} catch (error) {
				console.error('Error deleting appointment:', error);
			}
		}
	};

	const handleLogout = () => {
		logout();
	};

	const getStatusColor = (status) => {
		const colors = {
			upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
			ongoing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
			done: 'bg-slate-100 text-slate-800 border-slate-200',
			cancelled: 'bg-red-100 text-red-800 border-red-200'
		};
		return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
	};

	const getStatusIcon = (status) => {
		const icons = {
			upcoming: <Clock4 className="w-4 h-4" />,
			ongoing: <Activity className="w-4 h-4" />,
			done: <CheckCircle2 className="w-4 h-4" />,
			cancelled: <XCircle className="w-4 h-4" />
		};
		return icons[status] || <AlertCircle className="w-4 h-4" />;
	};

	const formatTime = (time) => {
		return time;
	};

	const filteredAppointments = appointments.filter(appointment => {
		const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			appointment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			appointment.phone.includes(searchQuery);
		const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.3 }}
			className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0" style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234755B5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					backgroundSize: '60px 60px'
				}} />
			</div>

			{/* Top Navigation Bar */}
			<div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-semibold text-gray-900">Celestial Aura Portal</h1>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<User className="w-4 h-4" />
								<span>{user.name}</span>
							</div>
							<Button
								onClick={handleLogout}
								variant="outline"
								className="border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
							>
								<LogOut className="w-4 h-4" />
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
						<p className="mt-1 text-sm text-gray-500">Manage appointments and schedule</p>
					</div>
					<Button
						onClick={() => {
							setFormMode('create');
							setSelectedAppointment(null);
							setIsFormOpen(true);
						}}
						className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
					>
						<Plus className="w-4 h-4" />
						New Appointment
					</Button>
				</div>

				{/* Date Navigation */}
				<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								onClick={() => handleDateChange(-1)}
								variant="outline"
								className="border-gray-300 hover:bg-gray-50"
							>
								<ChevronLeft className="w-4 h-4" />
							</Button>
							<div className="text-lg font-semibold">
								{new Date(selectedDate).toLocaleDateString('en-US', { 
									weekday: 'long', 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric' 
								})}
							</div>
							<Button
								onClick={() => handleDateChange(1)}
								variant="outline"
								className="border-gray-300 hover:bg-gray-50"
							>
								<ChevronRight className="w-4 h-4" />
							</Button>
						</div>
						<div className="flex items-center gap-2">
							<div className="relative">
								<Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search appointments..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
								/>
							</div>
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
							>
								<option value="all">All Status</option>
								<option value="upcoming">Upcoming</option>
								<option value="ongoing">Ongoing</option>
								<option value="done">Done</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-gray-200"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-indigo-50 rounded-lg">
								<User className="w-6 h-6 text-indigo-600" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-gray-500">Total Appointments</h3>
								<p className="text-2xl font-semibold text-gray-900">{appointments.length}</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-gray-200"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-50 rounded-lg">
								<Clock4 className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
								<p className="text-2xl font-semibold text-gray-900">
									{appointments.filter(a => a.status === 'upcoming').length}
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-gray-200"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-indigo-50 rounded-lg">
								<Activity className="w-6 h-6 text-indigo-600" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-gray-500">Ongoing</h3>
								<p className="text-2xl font-semibold text-gray-900">
									{appointments.filter(a => a.status === 'ongoing').length}
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-gray-200"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-slate-50 rounded-lg">
								<CheckCircle2 className="w-6 h-6 text-slate-600" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-gray-500">Completed</h3>
								<p className="text-2xl font-semibold text-gray-900">
									{appointments.filter(a => a.status === 'done').length}
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Appointments Table */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden"
				>
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900">Appointments</h2>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50/50 backdrop-blur-sm">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Patient
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Time
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Contact
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200">
								{filteredAppointments.map((appointment) => (
									<tr key={appointment._id} className="hover:bg-gray-50/50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
											<div className="text-xs text-gray-500">{appointment.service}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{formatTime(appointment.appointmentTime)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<select
												value={appointment.status}
												onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
												className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(appointment.status)} flex items-center gap-1 bg-white/50 backdrop-blur-sm`}
											>
												<option value="upcoming">Upcoming</option>
												<option value="ongoing">Ongoing</option>
												<option value="done">Done</option>
												<option value="cancelled">Cancelled</option>
											</select>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900 flex items-center gap-1">
												<Mail className="w-4 h-4" />
												{appointment.email}
											</div>
											<div className="text-sm text-gray-500 flex items-center gap-1">
												<Phone className="w-4 h-4" />
												{appointment.phone}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex items-center justify-end gap-2">
												<button
													onClick={() => handleEdit(appointment)}
													className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
												>
													Edit
												</button>
												<button
													onClick={() => handleDelete(appointment._id)}
													className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</motion.div>
			</div>

			<AppointmentForm
				isOpen={isFormOpen}
				onClose={() => {
					setIsFormOpen(false);
					setSelectedAppointment(null);
				}}
				onSubmit={formMode === 'create' ? handleCreateAppointment : handleUpdateAppointment}
				initialData={selectedAppointment}
				mode={formMode}
			/>
		</motion.div>
	);
};

export default DashboardPage;
