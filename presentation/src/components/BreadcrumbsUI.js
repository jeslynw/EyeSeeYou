import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BreadcrumbsUI() {
    const breadcrumbItems = [
        {path: '/nadashboard', name:'Dashboard'},
        {path: '/trendingattacks', name: "Trending Attacks"}

    ]

  return (
    <div>
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography>Breadcrumbs</Typography>
      </Breadcrumbs> */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" color="primary" />} aria-label="breadcrumb">
      {breadcrumbItems.map((item) => (
                <Link
                className='text-[#000] dark:text-[#ffffff]'
                to = {item.path}
                underline="hover"
                onClick = {item.onClick}
                color="inherit"
                >
                    <p>{item.name}</p>
                </Link>
            
        ))}
        </Breadcrumbs>
    </div>
  );
}