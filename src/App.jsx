import { useState, useEffect } from 'react';
import CourseCard from './components/CourseCard';
import CourseModal from './components/CourseModal';
import SkeletonLoader from './components/SkeletonLoader';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const mockCourses = [
  { 
    id: 1, 
    title: "Advanced Python Programming", 
    price: 450000, 
    image: "/images/python-course.jpg", 
    description: "Learn Python from basics to advanced.", 
    fullDescription: "Comprehensive course covering Python fundamentals, data structures, and web development.", 
    rating: 4.5,
    detailImages: [
      "/images/python-detail-1.jpg",
      "/images/python-detail-2.jpg"
    ]
  },
  { 
    id: 2, 
    title: "English with Native Speakers", 
    price: 750000, 
    image: "/images/english-course.jpg", 
    description: "Improve your English fluency.", 
    fullDescription: "Interactive lessons with native English speakers.", 
    rating: 4.8,
    detailImages: [
      "/images/english-detail-1.jpg",
      "/images/english-detail-2.jpg"
    ]
  },
  { 
    id: 3, 
    title: "Data Science Bootcamp", 
    price: 1200000, 
    image: "/images/data-science-course.jpg", 
    description: "Master data science with AI.", 
    fullDescription: "In-depth bootcamp on data science and machine learning.", 
    rating: 4.7,
    detailImages: [
      "/images/data-science-detail-1.jpg",
      "/images/data-science-detail-2.jpg"
    ]
  },
];

const mockApi = {
  getCourses: () => Promise.resolve(mockCourses),
  getSuggestions: () => Promise.resolve(mockCourses.slice(0, 2)),
};

function App() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    setLoading(true);
    mockApi.getCourses()
      .then(data => {
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      })
      .catch(() => setError('Failed to fetch courses'));
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (priceFilter) {
      filtered = filtered.filter(course => {
        if (priceFilter === '<500K') return course.price < 500000;
        if (priceFilter === '500K-1M') return course.price >= 500000 && course.price <= 1000000;
        if (priceFilter === '>1M') return course.price > 1000000;
        return true;
      });
    }
    setFilteredCourses(filtered);
  }, [searchTerm, priceFilter, courses]);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setViewHistory(prev => [course, ...prev.filter(c => c.id !== course.id)].slice(0, 5));
  };

  const handleToggleFavorite = (courseId) => {
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
    if (!favorites.includes(courseId)) {
      toast.success('Đã thêm vào yêu thích!');
    } else {
      toast.info('Đã xóa khỏi yêu thích!');
    }
  };

  const handleGetSuggestions = () => {
    setLoading(true);
    mockApi.getSuggestions()
      .then(data => {
        setSuggestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tìm thấy gợi ý');
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center ">Sàn giáo dục thương mại điện tử </h1>
            
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded ${activeTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Khóa học
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded ${activeTab === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Yêu thích
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Lịch sử xem
        </button>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Bộ lọc giá</option>
          <option value="<500K"> Dưới 500K</option>
          <option value="500K-1M">500K - 1M</option>
          <option value=">1M"> Trên 1M</option>
        </select>
        <button
          onClick={handleGetSuggestions}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Gợi ý sản phẩm phù hợp
        </button>
      </div>
      {suggestions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Những khóa học phù hợp với bạn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(course.id)}
                  />
                ))}
              </div>
            </div>
        )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {activeTab === 'courses' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tất cả khóa học</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              Array(3).fill().map((_, i) => <SkeletonLoader key={i} />)
            ) : (
              filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(course.id)}
                />
              ))
            )}
          </div>

        </div>
      )}
      {activeTab === 'favorites' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Khóa học yêu thích</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses
              .filter(course => favorites.includes(course.id))
              .map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={true}
                />
              ))}
          </div>
        </div>
      )}
      {activeTab === 'history' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lịch sử xem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {viewHistory.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(course.id)}
              />
            ))}
          </div>
        </div>
      )}
      {console.log('selectedCourse:', selectedCourse)}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;