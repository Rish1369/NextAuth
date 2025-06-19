export default function userProfilePage({params}:any) {
  const logout = async () => {};
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page content.</p>
    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
      logout
    </button>
    </div>
  );
}