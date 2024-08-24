import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer'; 
import Card from '../Components/card';     
import Crousel from '../Components/Crousel';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/fooddata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setFoodItem(result[0]);
      setFoodCat(result[1]);
    } catch (err) {
      console.error('Error fetching food data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <Crousel />
      <div className='container'>
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id}>
              <div className='fs-3 m-3'>
                {category.CategoryName}
              </div>
              <hr />
              <div className='row'>
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(item => item.CategoryName === category.CategoryName)
                    .map(filteredItem => (
                      <div key={filteredItem._id} className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                        <Card item={filteredItem} />
                      </div>
                    ))
                ) : (
                  <div className='col-12'>No items found.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No categories found.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}


