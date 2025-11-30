function UpdateEventForm({ eventData, handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit} className="my-[2.5vh] mb-[5vh]">
      <div className="mb-[3.5vh]">
        <label htmlFor="event_name">Event Name</label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          value={eventData.event_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-[3.5vh]">
        <label htmlFor="host">Host</label>
        <input
          type="text"
          id="host"
          name="host"
          value={eventData.host}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-[3.5vh]">
        <label htmlFor="event_start">Event Start Time</label>
        <input
          type="datetime-local"
          id="event_start"
          name="event_start"
          value={eventData.event_start}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-[3.5vh]">
        <label htmlFor="event_end">Event End Time</label>
        <input
          type="datetime-local"
          id="event_end"
          name="event_end"
          value={eventData.event_end}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-[3.5vh]">
        <label htmlFor="event_description">Description</label>
        <input
          type="text"
          id="event_description"
          name="event_description"
          value={eventData.event_description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-[3.5vh]">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={eventData.category}
          onChange={handleChange}
          required
        />
      </div>

      <fieldset className="mb-[3.5vh]">
        <label htmlFor="is_online">Is this event online? (Tick if yes)</label>
        <input
          type="checkbox"
          id="is_online"
          name="is_online"
          checked={eventData.is_online}
          onChange={handleChange}
        />
      </fieldset>

      <div className="mb-[3.5vh]">
        <label htmlFor="venue">Venue Name (If offline event)</label>
        <input
          type="text"
          id="venue"
          name="venue"
          value={eventData.venue}
          onChange={handleChange}
          disabled={eventData.is_online}
        />
      </div>

      <div className="mb-[3.5vh]">
        <label htmlFor="venue_address">Venue Address (If offline event)</label>
        <input
          type="text"
          id="venue_address"
          name="venue_address"
          value={eventData.venue_address}
          onChange={handleChange}
          disabled={eventData.is_online}
        />
      </div>

      <fieldset className="mb-[3.5vh]">
        <label htmlFor="is_free">Is this event free? (Tick if yes)</label>
        <input
          type="checkbox"
          id="is_free"
          name="is_free"
          checked={eventData.is_free}
          onChange={handleChange}
        />
      </fieldset>

      <div className="mb-[3.5vh]">
        <label htmlFor="cost_in_gbp">Cost (If not free)</label>
        <input
          type="number"
          id="cost_in_gbp"
          name="cost_in_gbp"
          value={eventData.cost_in_gbp}
          onChange={handleChange}
          disabled={eventData.is_free}
        />
      </div>

      <fieldset className="mb-[3.5vh]">
        <label htmlFor="is_limit">
          Is there an attendee limit? (Tick if yes)
        </label>
        <input
          type="checkbox"
          id="is_limit"
          name="is_limit"
          checked={eventData.is_limit}
          onChange={handleChange}
        />
      </fieldset>

      <div className="mb-[3.5vh]">
        <label htmlFor="attendee_limit">Attendee Limit</label>
        <input
          type="number"
          id="attendee_limit"
          name="attendee_limit"
          value={eventData.attendee_limit}
          onChange={handleChange}
          disabled={!eventData.is_limit}
        />
      </div>

      <button
        type="submit"
        className="mt-[1.5vh] h-[7vh] bg-black text-white text-xl hover:cursor-pointer"
      >
        Update Event
      </button>
    </form>
  );
}

export default UpdateEventForm;
