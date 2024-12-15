document.addEventListener("DOMContentLoaded", () => {
  const dashboard = document.getElementById("dashboard");
  const blocksSection = document.getElementById("blocksSection");
  const transactionsSection = document.getElementById("transactionsSection");

  const navDashboard = document.getElementById("navDashboard");
  const navBlocks = document.getElementById("navBlocks");
  const navTransactions = document.getElementById("navTransactions");
  const darkModeToggle = document.getElementById("darkModeToggle");

  const blocksAPI = "https://explorer.mtw-testnet.com/blocks/?page=1&limit=3";
  const transactionsAPI = "https://explorer.mtw-testnet.com/transactions/?page=1&limit=3";

  // Fetch data from an API
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Populate Dashboard with Latest Blocks
  async function populateDashboardBlocks() {
    const blocksTable = document.getElementById("blocksTable");
    blocksTable.innerHTML = "";
    const blocks = await fetchData(blocksAPI);

    blocks.forEach((block) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border-b">${new Date(block.timestamp * 1000).toLocaleString()}</td>
        <td class="py-2 px-4 border-b">${block.number}</td>
        <td class="py-2 px-4 border-b">${block.transactions}</td>
        <td class="py-2 px-4 border-b text-blue-600">${block.hash}</td>
      `;
      blocksTable.appendChild(row);
    });
  }

  // Populate Dashboard with Latest Transactions
  async function populateDashboardTransactions() {
    const transactionsTable = document.getElementById("dashboardTransactionsTable");
    transactionsTable.innerHTML = "";
    const transactions = await fetchData(transactionsAPI);

    transactions.forEach((tx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border-b">${new Date(tx.timestamp * 1000).toLocaleString()}</td>
        <td class="py-2 px-4 border-b">${tx.baseFeePerGas}</td>
        <td class="py-2 px-4 border-b">${tx.extraData || "N/A"}</td>
        <td class="py-2 px-4 border-b">${tx.parentHash}</td>
        <td class="py-2 px-4 border-b text-blue-600">${tx.hash}</td>
      `;
      transactionsTable.appendChild(row);
    });
  }

  // Populate Blocks Section
  async function populateBlocksSection() {
    const blocksTable = document.getElementById("blocksTable1");
    blocksTable.innerHTML = ""; // Clear existing content
    const blocks = await fetchData(blocksAPI);

    blocks.forEach((block) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border-b">${new Date(block.timestamp * 1000).toLocaleString()}</td>
        <td class="py-2 px-4 border-b">${block.number}</td>
        <td class="py-2 px-4 border-b">${block.transactions}</td>
        <td class="py-2 px-4 border-b text-blue-600">${block.hash}</td>
      `;
      blocksTable.appendChild(row);
    });
  }

  // Populate Transactions Section
  async function populateTransactionsSection() {
    const transactionsTable = document.getElementById("transactionsTable");
    transactionsTable.innerHTML = "";
    const transactions = await fetchData(transactionsAPI);

    transactions.forEach((tx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4 border-b">${new Date(tx.timestamp * 1000).toLocaleString()}</td>
        <td class="py-2 px-4 border-b">${tx.baseFeePerGas}</td>
        <td class="py-2 px-4 border-b">${tx.extraData || "N/A"}</td>
        <td class="py-2 px-4 border-b">${tx.parentHash}</td>
        <td class="py-2 px-4 border-b text-blue-600">${tx.hash}</td>
      `;
      transactionsTable.appendChild(row);
    });
  }

  // Navigation Functions
  function showDashboard() {
    dashboard.style.display = "block";
    blocksSection.style.display = "none";
    transactionsSection.style.display = "none";
    populateDashboardBlocks();
    populateDashboardTransactions();
  }

  function showBlocks() {
    dashboard.style.display = "none";
    blocksSection.style.display = "block";
    transactionsSection.style.display = "none";
    populateBlocksSection(); // Populate the blocks section
  }

  function showTransactions() {
    dashboard.style.display = "none";
    blocksSection.style.display = "none";
    transactionsSection.style.display = "block";
    populateTransactionsSection();
  }

  // Event Listeners for Navigation
  navDashboard.addEventListener("click", showDashboard);
  navBlocks.addEventListener("click", showBlocks);
  navTransactions.addEventListener("click", showTransactions);

  // Show Dashboard by Default
  showDashboard();

  // Dark Mode Toggle
  const html = document.documentElement; // The root HTML element

  // Check if a theme is already saved in localStorage
  const savedTheme = localStorage.getItem("theme");

  // Set initial button text based on saved theme
  darkModeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

  if (savedTheme === "dark") {
    html.classList.add("dark"); // Add the "dark" class to the root element
  }

  darkModeToggle.addEventListener("click", () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", ""); // Save the preference to localStorage
      darkModeToggle.textContent = "Dark Mode";
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Save the preference to localStorage
      darkModeToggle.textContent = "Light Mode";
    }
  });
});
