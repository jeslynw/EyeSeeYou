"use client";

import React from 'react'
import { Table } from "flowbite-react";
import { useState } from 'react';


function LoginHistoryTable() {
    const password = '';
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('')

    const headCell = ['username', 'Fullname', 'Date', 'Status']
    const tempData = [
        { name: 'Apple MacBook Pro 17"', color: 'Silver', type: 'Laptop', price: '$2999' },
        { name: 'Dell XPS 13', color: 'Black', type: 'Laptop', price: '$1199' },
        { name: 'HP Spectre x360', color: 'Silver', type: 'Laptop', price: '$1399' },
        { name: 'Lenovo ThinkPad X1', color: 'Black', type: 'Laptop', price: '$1599' },
        { name: 'Microsoft Surface Laptop 4', color: 'Platinum', type: 'Laptop', price: '$1499' },
        { name: 'Apple MacBook Pro 17"', color: 'Silver', type: 'Laptop', price: '$2999' },
        { name: 'Dell XPS 13', color: 'Black', type: 'Laptop', price: '$1199' },
        { name: 'HP Spectre x360', color: 'Silver', type: 'Laptop', price: '$1399' },
        { name: 'Lenovo ThinkPad X1', color: 'Black', type: 'Laptop', price: '$1599' },
        { name: 'Microsoft Surface Laptop 4', color: 'Platinum', type: 'Laptop', price: '$1499' },
      ];

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table className="min-w-full">
        <Table.Head className="sticky top-0 bg-slate-200">
          {headCell.map((title, index) => (
            <Table.HeadCell key={index}>
              {title}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {tempData.map((item, index) => (
            <Table.Row key={index} className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
              </Table.Cell>
              <Table.Cell>{item.color}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default LoginHistoryTable