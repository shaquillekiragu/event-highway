import "./SignUpForm.css";

function SignUpForm({
  handleSubmit,
  handleEmailChange,
  handlePasswordChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleDisplayNameChange,
  handleIsAdminChange,
}) {
  return (
    <form onSubmit={handleSubmit} className="signupForm">
      <div className="formGroup">
        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          type="text"
          placeholder="Enter your first name"
          onChange={handleFirstNameChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="last_name">Last Name:</label>
        <input
          id="last_name"
          type="text"
          placeholder="Enter your last name (optional)"
          onChange={handleLastNameChange}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="display_name">Display Name:</label>
        <input
          id="display_name"
          type="text"
          placeholder="Choose a display name"
          onChange={handleDisplayNameChange}
          required
        />
      </div>

      <fieldset className="formGroup">
        <legend>Admin Status:</legend>
        <div className="radioGroup">
          <input
            id="admin_yes"
            type="radio"
            name="is_admin"
            value={true}
            onChange={handleIsAdminChange}
          />
          <label htmlFor="admin_yes">Yes</label>
        </div>
        <div className="radioGroup">
          <input
            id="admin_no"
            type="radio"
            name="is_admin"
            value={false}
            onChange={handleIsAdminChange}
            defaultChecked
          />
          <label htmlFor="admin_no">No</label>
        </div>
      </fieldset>

      <button type="submit" className="submitButton">
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
