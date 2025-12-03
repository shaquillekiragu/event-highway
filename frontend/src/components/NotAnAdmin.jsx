function NotAnAdmin() {
  return (
    <main className="flex justify-center items-center min-h-screen py-16 px-8">
      <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-200 text-center max-w-md">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Access Denied
        </h1>
        <p className="text-gray-600">
          Sign in as an event administrator to access this page...
        </p>
      </div>
    </main>
  );
}

export default NotAnAdmin;
