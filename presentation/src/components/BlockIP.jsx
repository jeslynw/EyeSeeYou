import React, { useState, useEffect } from 'react';

function BlockIP({ isOpen, closeModal }) {
    const [ipAddress, setIpAddress] = useState('');
    const [blockedIPs, setBlockedIPs] = useState([]);
    const [error, setError] = useState(null);

    // Fetch list of blocked IPs when component mounts
    useEffect(() => {
        fetchBlockedIPs();
    }, []);

    const fetchBlockedIPs = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/nadashboard/list-blocked-ips');
            const data = await response.json();
            setBlockedIPs(data.rules);
        } catch (err) {
            setError('Failed to fetch blocked IPs');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/nadashboard/block-ip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ip: ipAddress }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to block IP');
            }

            setIpAddress('');
            fetchBlockedIPs();  // Refresh the list
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUnblock = async (ip) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/nadashboard/unblock-ip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ip }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to unblock IP');
            }

            fetchBlockedIPs();  // Refresh the list
        } catch (err) {
            setError(err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                <h2 className="text-xl font-semibold mb-4">Manage Blocked IPs</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="Enter IP address to block"
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="max-h-60 overflow-y-auto mb-4">
                        <h3 className="font-semibold mb-2">Blocked IPs:</h3>
                        <pre className="bg-gray-100 p-2 rounded text-sm">
                            {blockedIPs}
                        </pre>
                    </div>
                </form>

                <div className="mt-4 flex justify-between space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition"
                    >
                        Block IP
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition"
                    >
                        Close
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default BlockIP;
