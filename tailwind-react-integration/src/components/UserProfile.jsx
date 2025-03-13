function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-xs md:max-w-sm mx-auto my-10 md:my-20 rounded-lg shadow-lg">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto"
      />
      <h1 className="sm:text-lg md:text-xl text-blue-800 my-3 md:my-4 text-center">John Doe</h1>
      <p className="sm:text-sm md:text-base text-gray-600">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}
export default UserProfile;