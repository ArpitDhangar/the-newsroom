import React, { useState, useEffect } from 'react';
import './Home.scss';
import Card from './Card/Card';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function HomePage() {
  const [headlinesData, setHeadlinesData] = useState([]); // State to store headlines from backend
  const [selectedCard, setSelectedCard] = useState(null); // Manage selected card
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state
  const [isLoading, setIsLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  const newspaperNames = [
    'Times of India',
    'NDTV',
    'The Hindustan Times',
    'Jagran',
    'BBC',
  ]; // Array of newspaper names

  // Fetch headlines from backend (from the database)
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        setIsLoading(true); // Start loading state
        const response = await fetch(`${BASE_URL}/api/headlines`); // Fetch headlines from backend
        if (!response.ok) {
          throw new Error('Failed to fetch headlines'); // If there's an error in fetching
        }
        const data = await response.json(); // Parse JSON data
        console.log('Fetched data:', data); // Check the structure of the fetched data
        setHeadlinesData(data); // Set the headlines data to the state
      } catch (err) {
        setError(err.message); // If error occurs, set error state
      } finally {
        setIsLoading(false); // Stop loading after the fetch is done
      }
    };

    fetchHeadlines(); // Call fetch function
  }, []); // Empty dependency array to fetch data once when component mounts

    // Add or remove a class to disable body scroll when the modal is open
    useEffect(() => {
      if (isModalOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
  
      // Cleanup to ensure the class is removed
      return () => {
        document.body.classList.remove('no-scroll');
      };
    }, [isModalOpen]);


  // Open modal with selected card data
  const openModal = (cardIndex) => {
    const selectedHeadlines = headlinesData[cardIndex]?.headlines || []; // Safely access headlines
    setSelectedCard({
      index: cardIndex,
      headlines: selectedHeadlines,
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <main className="home-page">
      <div className="cards-container">
        {isLoading && <p>Loading headlines...</p>} {/* Loading indicator */}
        {error && <p className="error-message">{error}</p>} {/* Error message */}
        {!isLoading && !error && headlinesData.length > 0 && (
          headlinesData.map((headlines, index) => (
            <Card
              key={index}
              headlines={headlines.headlines || []} // Ensure headlines is accessed properly
              source={newspaperNames[index] || `Newspaper ${index + 1}`} // Fallback for source name
              onClick={() => openModal(index)} // Handle card click
            />
          ))
        )}
        {!isLoading && !error && headlinesData.length === 0 && (
          <p>No headlines available at the moment.</p>
        )}
      </div>

      {/* Modal to display selected headlines */}
      {isModalOpen && selectedCard?.headlines?.length > 0 && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              {/* Display the correct newspaper name */}
              <h1>{newspaperNames[selectedCard?.index] || 'All Headlines'}</h1>
            </div>
            <div className="modal-news-headlines">
              {/* Render headlines of the selected card */}
              {selectedCard?.headlines.map((headline, index) => (
                <p key={index} className="modal-headline">{headline}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default HomePage;
