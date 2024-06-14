import React, { useEffect, useState } from "react";
import Card from '../components/Card/Card';
import Case from '../components/Case';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function Dashboard() {
    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [lendings, setLendings] = useState([])
    const [landingGrouped, setLandingGrouped] = useState([]);
    const [totalUser, setTotalUser] = useState([0]);
    const [checkProses, setCheckProses] = useState();
  //untuk mengecek status login pengguna 
    const [isLogin, setIsLogin] = useState([]);
    const [authUser, setAuthUser] = useState([]);

    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => { //autentikasi pengguna, pengambilan data, dan navigasi berdasarkan status login.
      axios.get('http://localhost:8000/profile', {
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
      })
          .then(res => {
              setIsLogin(true);
              setAuthUser(res.data.data);
              if (location.pathname === '/login') {
                  navigate('/profile');
              }
          })
          .catch(err => {
              setIsLogin(false);
              if (err.response.status === 401 && location.pathname !== '/login') {
                  navigate('/login?message=' + encodeURIComponent('Anda belum login'));
              }
          })

          getDataUsers();
          getDataStuffs();
          getDataLendings();
  }, [checkProses]);

    function getDataStuffs() {
      axios.get(`http://localhost:8000/stuff/data`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(res => {
        setStuffs(res.data.data)
      })
      .catch(err => {
        if (err.response.status === 401) {
          navigate('/login?message=' + encodeURIComponent('Anda belum login'));
        }
      })
    }

    function getDataUsers() {
      axios.get(`http://localhost:8000/user/data`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        if (err.response.status === 401) {
          navigate('/login?message=' + encodeURIComponent('Anda belum login'));
        }
      })
    }

    function getDataLendings() {
      axios.get(`http://localhost:8000/lending/data`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
        .then(res => {
          setLendings(res.data.data)
          // mengelompokan data berdasarkan date_time
          const groupedData = {};
          data.forEach((entry) => {
            const date = new Date(entry.date_time);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
              if (!groupedData[formattedDate]) {
                groupedData[formattedDate] = [];
              }

              groupedData[formattedDate].push(entry);
          });
          //membuat struktur array baru yang berisi date (tanggal terformat sebelumnya) 
          //dan totalstuff (total dari total_stuff)

        const processedData = Object.keys(groupedData).map((date) => ({
          date,
          totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuf, 0)
        }));

        setLandingGrouped(processedData);
        // mengubah state checkproses menjadi true untuk men-trigger useEffect
        setCheckProses(true)
        })
        .catch(err => {
          if (err.response.status == 401) {
            navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
          }
        })
    }
      console.log(landingGrouped)
  return (
    <Case>
    <div className="flex flex-wrap justify-center m-10">
        <div className="p-4 w-1/2" >
            <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mrocalSt-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>
                    <h2 className="text-white dark:text-white text-lg font-medium"> Data Stuff</h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                    <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                </div>
            </div>
        </div>
       {
        isLogin ? authUser['role'] === 'admin' ? (
       <>
      <div className="p-4 w-1/2">
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
              </div>
          </div>
      </div>
      </>
        ) : (
          <>
          </>
            ) : ''
       }
        
          <div className="p-4 w-1/2">
                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h2 className="text-white dark:text-white text-lg font-medium">Data Lendings</h2>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                        <h1 className="text-white dark:text-white text-lg font-medium">{lendings.length}</h1>
                    </div>
                </div>
            </div>
           

            <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={landingGrouped}
            margin={{ 
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                const [day, month, year] = date.split('-');
                const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalStuff" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
       
    </div> 
</Case>

  )
}
