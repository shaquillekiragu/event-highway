function UpdateEventForm({ eventData, handleSubmit, handleChange }) {
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5">
			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col">
					<label
						htmlFor="event_name"
						className="mb-2 font-semibold text-gray-700 text-sm"
					>
						Event Name
					</label>
					<input
						type="text"
						id="event_name"
						name="event_name"
						value={eventData.event_name}
						onChange={handleChange}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="host" className="mb-2 font-semibold text-gray-700 text-sm">
						Host
					</label>
					<input
						type="text"
						id="host"
						name="host"
						value={eventData.host}
						onChange={handleChange}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						required
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col">
					<label
						htmlFor="event_start"
						className="mb-2 font-semibold text-gray-700 text-sm"
					>
						Event Start Time
					</label>
					<input
						type="datetime-local"
						id="event_start"
						name="event_start"
						value={eventData.event_start}
						onChange={handleChange}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="event_end"
						className="mb-2 font-semibold text-gray-700 text-sm"
					>
						Event End Time
					</label>
					<input
						type="datetime-local"
						id="event_end"
						name="event_end"
						value={eventData.event_end}
						onChange={handleChange}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						required
					/>
				</div>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="category"
					className="mb-2 font-semibold text-gray-700 text-sm"
				>
					Category
				</label>
				<input
					type="text"
					id="category"
					name="category"
					value={eventData.category}
					onChange={handleChange}
					className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
					required
				/>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="event_description"
					className="mb-2 font-semibold text-gray-700 text-sm"
				>
					Description
				</label>
				<textarea
					id="event_description"
					name="event_description"
					value={eventData.event_description}
					onChange={handleChange}
					rows="4"
					className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
					required
				/>
			</div>

			<div className="p-5 border border-gray-300 rounded-lg bg-gray-50">
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						id="is_online"
						name="is_online"
						checked={eventData.is_online}
						onChange={handleChange}
						className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
					/>
					<span className="font-semibold text-gray-700">This event is online</span>
				</label>
			</div>

			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col">
					<label
						htmlFor="venue"
						className="mb-2 font-semibold text-gray-700 text-sm"
					>
						Venue Name
					</label>
					<input
						type="text"
						id="venue"
						name="venue"
						value={eventData.venue}
						onChange={handleChange}
						disabled={eventData.is_online}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="venue_address"
						className="mb-2 font-semibold text-gray-700 text-sm"
					>
						Venue Address
					</label>
					<input
						type="text"
						id="venue_address"
						name="venue_address"
						value={eventData.venue_address}
						onChange={handleChange}
						disabled={eventData.is_online}
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
					/>
				</div>
			</div>

			<div className="p-5 border border-gray-300 rounded-lg bg-gray-50">
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						id="is_free"
						name="is_free"
						checked={eventData.is_free}
						onChange={handleChange}
						className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
					/>
					<span className="font-semibold text-gray-700">This event is free</span>
				</label>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="cost_in_gbp"
					className="mb-2 font-semibold text-gray-700 text-sm"
				>
					Cost (GBP)
				</label>
				<input
					type="number"
					id="cost_in_gbp"
					name="cost_in_gbp"
					value={eventData.cost_in_gbp}
					onChange={handleChange}
					disabled={eventData.is_free}
					className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
				/>
			</div>

			<div className="p-5 border border-gray-300 rounded-lg bg-gray-50">
				<label className="flex items-center gap-3 cursor-pointer">
					<input
						type="checkbox"
						id="is_limit"
						name="is_limit"
						checked={eventData.is_limit}
						onChange={handleChange}
						className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
					/>
					<span className="font-semibold text-gray-700">Set attendee limit</span>
				</label>
			</div>

			<div className="flex flex-col">
				<label
					htmlFor="attendee_limit"
					className="mb-2 font-semibold text-gray-700 text-sm"
				>
					Attendee Limit
				</label>
				<input
					type="number"
					id="attendee_limit"
					name="attendee_limit"
					value={eventData.attendee_limit}
					onChange={handleChange}
					disabled={!eventData.is_limit}
					className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
				/>
			</div>

			<button
				type="submit"
				className="mt-6 h-14 w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-teal-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
			>
				Update Event
			</button>
		</form>
	);
}

export default UpdateEventForm;
