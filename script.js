let coins = [];

    // Fetch data using .then
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        coins = data;
        renderTable(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Fetch data using async/await
    async function fetchData() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        coins = data;
        renderTable(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();

    // Render table
    function renderTable(data) {
      const coinTableBody = document.getElementById('coinTableBody');
      coinTableBody.innerHTML = '';

      data.forEach(coin => {
        const { name, id, image, symbol, current_price, total_volume } = coin;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${image}" alt="${name}" width="25"></td>
          <td>${name}</td>
          <td>${id}</td>
          <td>${symbol}</td>
          <td>${current_price}</td>
          <td>${total_volume}</td>
        `;

        coinTableBody.appendChild(row);
      });
    }

    // Search functionality
    function search() {
      const searchInput = document.getElementById('searchInput');
      const searchValue = searchInput.value.toLowerCase();
      const filteredData = coins.filter(coin => coin.name.toLowerCase().includes(searchValue));
      renderTable(filteredData);
    }

    // Sort by market cap
    function sortByMarketCap() {
      const sortedData = coins.sort((a, b) => b.market_cap - a.market_cap);
      renderTable(sortedData);
    }

    // Sort by percentage change
    function sortByPercentageChange() {
      const sortedData = coins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderTable(sortedData);
    }