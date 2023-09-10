
import { Link } from 'react-router-dom'; // Import Link for navigation
import welcomeImage from './iStock-637711198.jpg'
function Default() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-indigo-100">
   <div className="bg-teal-200 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl text-blue-800 font-bold mb-4">Welcome to Dev Academy!</h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Explore our collection of high-quality courses to enhance your skills and knowledge.
        </p>

        <img
         src={welcomeImage}// Add the path to your image
          alt="Course Illustration"
          className="mx-auto mb-6 rounded-lg shadow-md"
          style={{ maxWidth: '300px' }}
        />

        <Link
          to="/user/courses" // Use Link to navigate to the courses page
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
}

export default Default;
