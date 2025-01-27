import "./CreateEventForm.css";

function CreateEventForm({ eventData, handleSubmit, handleChange }) {
  return (
    <form onSubmit={handleSubmit} className="createEventForm">
      <div className="formGroup">
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

      <div className="formGroup">
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

      <div className="formGroup">
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

      <div className="formGroup">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={eventData.event_description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="is_online">Is this event online?</label>
        <input
          type="checkbox"
          id="is_online"
          name="is_online"
          checked={eventData.is_online}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup">
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

      <div className="formGroup">
        <label htmlFor="venue">Venue Address (If offline event)</label>
        <input
          type="text"
          id="venue"
          name="venue"
          value={eventData.venue_address}
          onChange={handleChange}
          disabled={eventData.is_online}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="is_free">Is this event free?</label>
        <input
          type="checkbox"
          id="is_free"
          name="is_free"
          checked={eventData.is_free}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup">
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

      <div className="formGroup">
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

      <div className="formGroup">
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

      <div className="formGroup">
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

      <button type="submit" className="submitButton">
        Create Event
      </button>
    </form>
  );
}

export default CreateEventForm;
