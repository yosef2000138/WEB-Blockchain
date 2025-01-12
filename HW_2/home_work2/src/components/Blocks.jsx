import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get('https://explorer.mtw-testnet.com/blocks/?page=1&limit=3');
        setBlocks(response.data.data);  // Assuming data structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blocks');
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#00df9a] dark:text-[#00df9a]">Latest Blocks</h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading blocks...</p>
      ) : error ? (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-[#00df9a] dark:bg-[#007a4e] text-white">
              <th className="border p-4">Block Number</th>
              <th className="border p-4">Timestamp</th>
              <th className="border p-4">Transactions</th>
              <th className="border p-4">Miner</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr key={block.number} className="hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-center">
                <td className="border p-4">{block.number}</td>
                <td className="border p-4">{new Date(block.timestamp * 1000).toLocaleString()}</td>
                <td className="border p-4">{block.transaction_count || 'N/A'}</td>
                <td className="border p-4">{block.miner || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blocks;
