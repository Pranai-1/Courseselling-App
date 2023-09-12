
import useCourses from "./CoursesHook";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
function AllCourses() {
  const courses = useCourses();

  return (
    <>
      {courses.length === 0 ? (
        <>
          <div className=" flex justify-center items-center">
            <p className="text-2xl text-blue-600 font-bold h-max w-max">
              Courses are not available
            </p>
          </div>
        </>
      ) : (
        <div className=" bg-blue-100 w-screen">
          <p className="text-xl text-blue-600 font-bold  w-screen  flex justify-center">
            All Courses
          </p>
          <div className=" flex flex-wrap justify-center">
            {courses.map((course) => (
              <CourseCard
                id={course._id}
                image={course.image}
                title={course.title}
                description={course.description}
                name={course.name}
                show="all" 
              />
            ))}
          </div>
          <Footer/>
        </div>
      )}
    </>
  );
}

export default AllCourses;
