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
      className="flex flex-col gap-5 my-0 mx-auto w-full"
    >
      <div className="grid grid-cols-2 gap-5">
        <section className="flex flex-col">
          <label
            htmlFor="first_name"
            className="mb-2 font-semibold text-gray-700 text-sm"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            placeholder="Enter your first name"
            onChange={handleFirstNameChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          />
        </section>

        <section className="flex flex-col">
          <label
            htmlFor="last_name"
            className="mb-2 font-semibold text-gray-700 text-sm"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            placeholder="Enter your last name (optional)"
            onChange={handleLastNameChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </section>
      </div>

      <section className="flex flex-col">
        <label
          htmlFor="display_name"
          className="mb-2 font-semibold text-gray-700 text-sm"
        >
          Display Name
        </label>
        <input
          id="display_name"
          type="text"
          placeholder="Choose a display name"
          onChange={handleDisplayNameChange}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
        />
      </section>

      <section className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 font-semibold text-gray-700 text-sm"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          onChange={handleEmailChange}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
        />
      </section>

      <section className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 font-semibold text-gray-700 text-sm"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
        />
      </section>

      <fieldset className="p-5 border border-gray-300 rounded-lg bg-gray-50">
        <legend className="mb-3 font-semibold text-gray-700 text-sm px-2">
          Admin Status
        </legend>
        <div className="flex items-center gap-6">
          <section className="flex items-center gap-2">
            <input
              id="admin_yes"
              type="radio"
              name="is_admin"
              value={true}
              onChange={handleIsAdminChange}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="admin_yes" className="font-medium text-gray-700">
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
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              defaultChecked
            />
            <label htmlFor="admin_no" className="font-medium text-gray-700">
              No
            </label>
          </section>
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full h-14 mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
