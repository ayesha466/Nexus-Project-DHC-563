import React, { useState } from 'react';

const initialTransactions = [
  { id: 1, type: 'Deposit', amount: 5000, sender: 'Stripe', receiver: 'You', status: 'Completed' },
  { id: 2, type: 'Withdraw', amount: 2000, sender: 'You', receiver: 'Bank', status: 'Completed' },
  { id: 3, type: 'Transfer', amount: 1000, sender: 'You', receiver: 'Entrepreneur', status: 'Pending' },
  { id: 4, type: 'Funding Deal', amount: 3000, sender: 'Investor', receiver: 'You', status: 'Completed' },
];

const PaymentSection: React.FC = () => {
  const [balance, setBalance] = useState(10000);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('Deposit');

  const handleAction = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    let newBalance = balance;
    if (action === 'Deposit') newBalance += amt;
    if (action === 'Withdraw') newBalance -= amt;
    if (action === 'Transfer') newBalance -= amt;
    setBalance(newBalance);
    setTransactions([
      {
        id: transactions.length + 1,
        type: action,
        amount: amt,
        sender: action === 'Deposit' ? 'Stripe' : 'You',
        receiver: action === 'Withdraw' ? 'Bank' : action === 'Transfer' ? 'Entrepreneur' : 'You',
        status: 'Completed',
      },
      ...transactions,
    ]);
    setAmount('');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-gray-800">
      <h2 className="text-cyan-400 text-2xl font-heading mb-4 text-center">Wallet & Payments</h2>
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-bold text-cyan-300">Wallet Balance</div>
        <div className="text-2xl font-bold text-green-400">${balance.toLocaleString()}</div>
      </div>
      <div className="flex gap-4 mb-6">
        <select value={action} onChange={e => setAction(e.target.value)} className="bg-gray-900 text-cyan-300 p-2 rounded border border-gray-700">
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className="bg-gray-900 text-cyan-300 p-2 rounded border border-gray-700 w-32"
        />
        <button className="bg-cyan-400 text-gray-900 px-4 py-2 rounded font-bold shadow" onClick={handleAction}>Submit</button>
      </div>
      <div className="mb-6">
        <h3 className="text-lg text-cyan-300 mb-2 font-semibold">Transaction History</h3>
        <table className="w-full text-left rounded overflow-hidden">
          <thead className="bg-gray-800 text-cyan-300">
            <tr>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Sender</th>
              <th className="px-3 py-2">Receiver</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-100">
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b border-gray-800">
                <td className="px-3 py-2">{tx.type}</td>
                <td className="px-3 py-2">${tx.amount.toLocaleString()}</td>
                <td className="px-3 py-2">{tx.sender}</td>
                <td className="px-3 py-2">{tx.receiver}</td>
                <td className={`px-3 py-2 font-bold ${tx.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-2">
        <h3 className="text-lg text-cyan-300 mb-2 font-semibold">Funding Deal (Investor → Entrepreneur)</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded font-bold shadow" onClick={() => {
          setBalance(balance + 3000);
          setTransactions([
            {
              id: transactions.length + 1,
              type: 'Funding Deal',
              amount: 3000,
              sender: 'Investor',
              receiver: 'You',
              status: 'Completed',
            },
            ...transactions,
          ]);
        }}>Simulate Funding Deal</button>
      </div>
    </div>
  );
};

export default PaymentSection;
