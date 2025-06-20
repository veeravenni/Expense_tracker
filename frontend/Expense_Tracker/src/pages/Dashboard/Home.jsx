import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {useUserAuth}  from "../../hooks/useUserAuth"
import {useNavigate} from "react-router-dom"
import{ useState, useEffect } from 'react';
import Infocard from '../../components/Cards/Infocard';

import { LuCoins, LuWalletMinimal } from "react-icons/lu";
import {IoMdCard} from "react-icons/io";
import { addThousandSeparator } from '../../utils/helper';
import RecentTransaction from '../../components/Dashboard/RecentTransaction';
const Home=()=>{
    useUserAuth();

    const navigate =useNavigate();

    const [dashboardData, setDashboardData]=useState(null);
    const [loading,setLoading]=useState(false);

    const fetchDashboardData=async ()=>{

        if(loading) return;

        setLoading(true);

    try{
    const response =await axiosInstance.get(
        `${API-API_PATHS.DASHBOARD.GET_DATA}`
    )

    if(response.data){
        setDashboardData(response.data);

    }
    }catch(error){
    console.log("Something went wrong . please try again",error)

    }
    finally{
    setLoading(false);
    }
};

    return(
    <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Infocard
                  icon={<IoMdCard/>}
                  label="Total Balance"
                  value={addThousandSeparator(dashboardData?.totalBalance ||0)}
                  color ="bg-primary"
                  />
                   <Infocard
                  icon={<LuWalletMinimal/>}
                  label="Total Income"
                  value={addThousandSeparator(dashboardData?.totalIncome ||0)}
                  color ="bg-orange-500"
                  />
                   <Infocard
                  icon={<LuCoins/>}
                  label="Total Expenses"
                  value={addThousandSeparator(dashboardData?.totalExpense ||0)}
                  color ="bg-red-500"
                  />
                  

            </div>
            <div className="grid grid-cols-1 md:grid-cols-1  mt-6 ">
              <RecentTransaction>
                 transactions={dashboardData?.RecentTransaction}
                 onSeeMore={()=>navigate("/expenses")}
              </RecentTransaction>

            </div>
        </div>
    </DashboardLayout>
    );
}

export default Home;