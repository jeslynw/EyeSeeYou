import { useState, useEffect } from 'react';

const FutureAttacks = ({ predictedAttack, confidenceLevel }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, [predictedAttack]);

  const severityMapping = {
    'CRITICAL': ['Shellcode', 'Backdoor', 'Worms',],
    'HIGH': ['Exploits', 'DoS', 'Reconnaissance'],
    'MEDIUM': ['Fuzzers', 'Generic'],
    'LOW': ['Analysis']
  };

  const getSeverity = (attack) => {
    for (const [severity, attacks] of Object.entries(severityMapping)) {
      if (attacks.includes(attack)) return severity;
    }
    return 'UNKNOWN';
  };

  const severityStyles = {
    'CRITICAL': {
      bg: 'bg-[#FF5733]',
      text: 'text-[#FF5733]',
      border: 'border-[#FF5733]',
      light: 'bg-red-100',
      progress: 'bg-[#FF5733]'
    },
    'HIGH': {
      bg: 'bg-orange-400',
      text: 'text-orange-400',
      border: 'border-orange-400',
      light: 'bg-orange-100',
      progress: 'bg-orange-400'
    },
    'MEDIUM': {
      bg: 'bg-yellow-400',
      text: 'text-yellow-400',
      border: 'border-yellow-400',
      light: 'bg-yellow-100',
      progress: 'bg-yellow-400'
    },
    'LOW': {
      bg: 'bg-[#51ff2e]',
      text: 'text-[#51ff2e]',
      border: 'border-[#51ff2e]',
      light: 'bg-green-100',
      progress: 'bg-[#51ff2e]'
    },
    'UNKNOWN': {
      bg: 'bg-gray-500',
      text: 'text-gray-500',
      border: 'border-gray-500',
      light: 'bg-gray-100',
      progress: 'bg-gray-400'
    }
  };

  const severity = getSeverity(predictedAttack);
  const styles = severityStyles[severity];

  const getIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
            </svg>
        );
      case 'HIGH':
        return (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
            </svg>
        );
      case 'MEDIUM':
        return (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
            </svg>
        );
      default:
        return (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
            </svg>
        );
    }
  };

  return (
    <div className={`transition-all duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className="border border-[#e7e7e7] dark:border-[#353535] rounded-xl p-6 bg-white dark:bg-[#252628] shadow-md">
        <h2 className="pb-5 text-sm md:text-base dark:text-white">Predicted Future Attack</h2>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`${styles.bg} p-3 rounded-lg text-white`}>
              {getIcon(severity)}
            </div>
            <div>
              <h3 className="text-2xl font-bold dark:text-white">{predictedAttack}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Detected Pattern</p>
            </div>
          </div>
          
          <div className={`${styles.light} ${styles.text} px-4 py-1 rounded-full text-sm font-medium`}>
            {severity}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500 dark:text-gray-400">Confidence Level</span>
            <span className="font-medium dark:text-white">{confidenceLevel}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${styles.progress} transition-all duration-500 ease-out`}
              style={{ width: `${confidenceLevel}%` }}
            />
          </div>
        </div>

        <div className="mt-6 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#2f3541]">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${styles.text}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This attack is classified as <span className="font-medium">{severity}</span> severity. Immediate action may be required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureAttacks;