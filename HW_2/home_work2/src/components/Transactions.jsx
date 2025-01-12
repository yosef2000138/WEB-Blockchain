import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://explorer.mtw-testnet.com/transactions/?page=1&limit=3');
        setTransactions(response.data.data);  // Assuming data structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a] dark:text-[#00df9a]">Latest Transactions</h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-[#00df9a] dark:bg-[#007a4e] text-white">
              <th className="border p-4">Hash</th>
              <th className="border p-4">Block Number</th>
              <th className="border p-4">Gas Used</th>
              <th className="border p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-center">
                <td className="border p-4">{tx.hash}</td>
                <td className="border p-4">{tx.block_number || 'N/A'}</td>
                <td className="border p-4">{tx.gas_used || 'N/A'}</td>
                <td className="border p-4">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
