import React from 'react';

function TopThreatSrc({ threats, error })  {
    return (
        <div>
             <div className="">
                {error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <div className='space-y-2 px-4'>
                        {console.log('SrcThreats:', threats)}

                        {threats.length === 0 ? (
                            <div>No data available</div>
                        ) : (
                            threats.map((threat, index) => (
                                <div key={index} className="flex justify-between items-center border border-[#e7e7e7] dark:border-[#636363] bg-[#4b4b4b63] py-2 px-7 rounded-md">
                                    <span className="text-white text-[15px] font-light">{threat.source_address}</span>
                                    <span className="text-white text-[15px] font-light">{threat.count_source_address}</span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
  };
export default TopThreatSrc