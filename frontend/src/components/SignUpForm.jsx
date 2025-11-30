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
    <form
      onSubmit={handleSubmit}
      className="max-w-100 flex flex-col gap-4 my-0 mx-auto *:flex *:flex-col"
    >
      <section>
        <label htmlFor="email" className="mb-1 font-bold">
          Email Address:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          onChange={handleEmailChange}
          className="p-2 border rounded-lg"
          required
        />
      </section>

      <section>
        <label htmlFor="password" className="mb-1 font-bold">
          Password:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
          className="p-2 border rounded-lg"
          required
        />
      </section>

      <section>
        <label htmlFor="first_name" className="mb-1 font-bold">
          First Name:
        </label>
        <input
          id="first_name"
          type="text"
          placeholder="Enter your first name"
          onChange={handleFirstNameChange}
          className="p-2 border rounded-lg"
          required
        />
      </section>

      <section>
        <label htmlFor="last_name" className="mb-1 font-bold">
          Last Name:
        </label>
        <input
          id="last_name"
          type="text"
          placeholder="Enter your last name (optional)"
          onChange={handleLastNameChange}
          className="p-2 border rounded-lg"
        />
      </section>

      <section>
        <label htmlFor="display_name" className="mb-1 font-bold">
          Display Name:
        </label>
        <input
          id="display_name"
          type="text"
          placeholder="Choose a display name"
          onChange={handleDisplayNameChange}
          className="p-2 border rounded-lg"
          required
        />
      </section>

      <fieldset className="p-2 border rounded-lg">
        <legend className="mb-1 font-bold">Admin Status:</legend>

        <section className="flex items-center gap-2">
          <input
            id="admin_yes"
            type="radio"
            name="is_admin"
            value={true}
            onChange={handleIsAdminChange}
            className="p-2 border rounded-lg"
          />
          <label htmlFor="admin_yes" className="mb-1 font-bold">
            Yes
          </label>
        </section>

        <section className="flex items-center gap-2">
          <input
            id="admin_no"
            type="radio"
            name="is_admin"
            value={false}
            onChange={handleIsAdminChange}
            className="p-2 border rounded-lg"
            defaultChecked
          />
          <label htmlFor="admin_no" className="mb-1 font-bold">
            No
          </label>
        </section>
      </fieldset>

      <button
        type="submit"
        className="w-1/2 h-[6vh] self-center ml-[40%] mt-7 p-3 bg-black text-white text-xl hover:cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
