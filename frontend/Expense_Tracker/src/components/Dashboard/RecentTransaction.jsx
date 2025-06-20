import React from 'react'
import { LuArrowRight } from 'react-icons/lu'

const RecentTransaction=(transactions,onSeeMore)=>{
    return(


        <div className="card">
          <div className="flex items-center justify-between ">
            <h5 className="text-lg font-semibold">Recent Transactions</h5>
            <button
              className="flex items-center  gap-1 text-sm  hover:underline"
              onClick={onSeeMore}
            >
              See All <LuArrowRight className="text-base" />
            </button>
          </div>
        </div>
        
            
    )
}

export default RecentTransaction