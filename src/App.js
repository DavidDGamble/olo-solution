import React, { useEffect, useState } from 'react';

function App() {
  const [toppingCombinations, setToppingCombinations] = useState([]);

  useEffect(() => {
    fetch('http://files.olo.com/pizzas.json')
      .then(response => response.json())
      .then(data => {
        const combinations = data.reduce((combinations, pizza) => {
          const toppings = pizza.toppings.sort().join(',');
          combinations[toppings] = (combinations[toppings] || 0) + 1;
          return combinations;
        }, {});

        const sortedCombinations = Object.entries(combinations)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20);

        setToppingCombinations(sortedCombinations);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Top 20 Most Frequently Ordered Pizza Topping Combinations</h1>
      <ul>
        {toppingCombinations.map(([toppings, frequency], index) => (
          <li key={index}>
            <strong>Rank {index + 1}: </strong>
            Toppings: {toppings}, Frequency: {frequency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;