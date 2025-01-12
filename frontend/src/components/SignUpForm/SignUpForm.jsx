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
    <>
      <h3>Sign Up:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address: </label>
        <input
          id="email"
          type="text"
          placeholder="Type here..."
          onChange={handleEmailChange}
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="Type here..."
          onChange={handlePasswordChange}
          required
        />
        <br />
        <label htmlFor="first_name">First Name: </label>
        <input
          id="first_name"
          type="text"
          placeholder="Type here..."
          onChange={handleFirstNameChange}
          required
        />
        <br />
        <label htmlFor="last_name">Last Name: </label>
        <input
          id="last_name"
          type="text"
          placeholder="Type here... (optional)"
          onChange={handleLastNameChange}
        />
        <br />
        <label htmlFor="display_name">Display Name: </label>
        <input
          id="display_name"
          type="text"
          placeholder="Type here..."
          onChange={handleDisplayNameChange}
          required
        />
        <br />
        <label htmlFor="is_admin">Admin Status: </label>
        <input
          id="is_admin"
          type="radio"
          onChange={handleIsAdminChange}
          required
        />
        <br />
        <button type="submit" className="logButton">
          Sign In!
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
