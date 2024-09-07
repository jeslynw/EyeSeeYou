import React from 'react'
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import BreadcrumbsUI from '../components/BreadcrumbsUI';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';

function TrendingAttacksUI() {
    const { darkMode } = useTheme();

    // current date
    const date = new Date();
    const showDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const currentDate = showDate + ' , ' + showTime
    // event.preventDefault();
    // console.info('You clicked a breadcrumb.');

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Header />  

            <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
                
                <div className="flex justify-between items-center mt-4 mb-4">
                    <p className="text-2xl">TRENDING ATTACKS</p>
                    <p className="text-base">{currentDate}</p>
                </div>
                <div>
                    <BreadcrumbsUI />
                </div>
                
                {/* <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                        MUI
                        </Link>
                        <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                        >
                        Core
                        </Link>
                        <Typography color="text.primary">Breadcrumbs</Typography>
                    </Breadcrumbs>
                </div> */}
                
                <div className="py-2"></div>

                <div className="w-full">
                    {/* Bar Chart */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Trending Attacks Bar Chart</p>
                        <div className="h-96">

                        </div>
                    </div>

                    <div className="py-4"></div>

                    {/* Table */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Trending Attacks Table</p>
                        <div className="h-80">

                        </div>
                    </div>
                </div>

                <div className='p-10'></div>

            </div>
        </div>
    );
}

export default TrendingAttacksUI