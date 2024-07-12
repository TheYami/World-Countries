'use client'
import Image from 'next/image';
import background from './img/hero-image-wr.jpg';
import logo from './img/Logo.svg';
import search from './img/Search.svg';
import axios from 'axios';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import down from '../img/Expand_down.svg';
import check from '../img/Done_round.svg';

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
  };
  area: string;
}

export default function Page() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(20);
  const [regions, setRegions] = useState('');

  // Pagination
  const [page, setPage] = useState(1);

  const prevPage = () => {
    setPage(page => page - 1);
    setStartPage(startPage => startPage - 20);
    setEndPage(endPage => endPage - 20);
  };

  const nextPage = () => {
    setPage(page => page + 1);
    setStartPage(startPage => startPage + 20);
    setEndPage(endPage => endPage + 20);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        if (response.data) {
          setAllCountries(response.data);
          setCountries(response.data.slice(startPage, endPage));
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [startPage, endPage]);

  // Filtering by region
  const findRegion = (region: string) => {
    setRegions(region);
    if (regions === region) {
      setRegions('');
    }
  };

  useEffect(() => {
    const filteredCountries = allCountries.filter(country => country.region.includes(regions));
    setCountries(filteredCountries);
    if (regions === '') {
      setCountries(allCountries.slice(startPage, endPage));
    }
  }, [regions, startPage, endPage]);

  // Checkbox states
  const [isCheck, setIsCheck] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);

  const openCheck = () => {
    setIsCheck(!isCheck);
  };

  const openCheck2 = () => {
    setIsCheck2(!isCheck2);
  };

  // Input change handling
  const [input, setInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    const filterData = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    setCountries(filterData);
    if (input === '') {
      setCountries(allCountries.slice(startPage, endPage));
    }
  }, [input, startPage, endPage, allCountries]);

  return (
    <main className="bg-[#1B1D1F]">
      <div className="relative z-0">
        <Image src={background} alt="background" className="w-full h-[150px] object-cover" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image src={logo} alt="logo" />
        </div>
      </div>

      <div className="w-[95%] max-w-[95%] bg-[#1C1D1F] mx-5 rounded-xl border-[1px] border-[#282B30]">
        <div className="flex flex-wrap items-center justify-between my-5 mx-5">
          <h2 className="font-[32px] text-[#6C727F]">Found 234 countries</h2>
          <div className="flex items-center bg-[#282B30] px-4 py-2 rounded-lg">
            <Image src={search} width={21} height={21} alt="search" />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search by Name, Region, Subregion"
              className="bg-[#282B30] text-[#646A76] outline-none w-[250px] md:w-[300px] text-[14px] px-2 py-1"
            />
          </div>
        </div>

        <div className="w-full md:flex mx-5">
          <div className="md:w-[20%]">
            <h5 className="text-[#646A76] text-[12px] font-bold">Sort by</h5>
            <div className="bg-[#1B1D1F] w-[80%] sm:w-[90%] flex items-center justify-between text-[#D2D5DA] rounded-md px-4 py-2 mt-1 border-2 border-[#646A76] border-opacity-[0.3]">
              Populations
              <span>
                <Image src={down} alt="down" />
              </span>
            </div>

            <div className="mt-8">
              <h5 className="text-[#646A76] text-[12px] font-bold">Region</h5>
              <div className="flex flex-wrap items-center gap-2 pr-10">
                <button
                  onClick={() => findRegion('Americas')}
                  className="text-[#646a76] text-[14px] font-semibold px-3 py-2 rounded-md hover:bg-[#282B30] hover:text-[#d2d5da] mt-2"
                >
                  Americas
                </button>

                {/* Add other region buttons similarly */}
              </div>
            </div>

            <div className="mt-10">
              <h5 className="text-[#646A76] text-[12px] font-bold">Status</h5>
              <div className="flex gap-2 items-center mt-2">
                <div
                  className={`w-6 h-6 border-2 border-[#646a76] rounded-md cursor-pointer ${
                    isCheck ? 'bg-blue-500 border-none' : 'bg-transparent'
                  }`}
                  onClick={openCheck}
                >
                  {isCheck && (
                    <div>
                      <Image src={check} alt="check" />
                    </div>
                  )}
                </div>
                <h3 className="text-[#D2D5DA] text-[14px]">Member of the United Nations</h3>
              </div>

              <div className="flex gap-2 items-center mt-2">
                <div
                  className={`w-6 h-6 border-2 border-[#646a76] rounded-md cursor-pointer ${
                    isCheck2 ? 'bg-blue-500 border-none' : 'bg-transparent'
                  }`}
                  onClick={openCheck2}
                >
                  {isCheck2 && (
                    <div>
                      <Image src={check} alt="check" />
                    </div>
                  )}
                </div>
                <h3 className="text-[#D2D5DA] text-[14px]">Independent</h3>
              </div>
            </div>
          </div>

          <div className="md:w-[80%] mx-5 overflow-x-auto md:pl-20">
            <table className="w-[80%] bg-[#1C1D1F] text-[#646A76]">
              <thead>
                <tr className="border-b-2 border-[#646A76]">
                  <th className="px-4 py-4 text-[12px] font-semibold">Flag</th>
                  <th className="px-4 py-2 text-[12px] font-semibold text-center">Name</th>
                  <th className="px-4 py-2 text-[12px] font-semibold text-start">Population</th>
                  <th className="px-4 py-2 text-[12px] font-semibold text-start">Area (km<sup>2</sup>)</th>
                  <th className="px-4 py-2 text-[12px] font-semibold text-start">Region</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country: Country, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center">
                        <Link href={`/${index}`}>
                          <Image src={country.flags.png} alt={country.name.common} width={60} height={40} className="rounded-md" />
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-2 sm:text-[14px] md:text-[16px] text-[#899bb9] text-center">{country.name.common}</td>
                    <td className="px-4 py-2 sm:text-[14px] md:text-[16px] text-[#D2D5DA] text-start">{country.population.toLocaleString()}</td>
                    <td className="px-4 py-2 sm:text-[14px] md:text-[16px] text-[#D2D5DA] text-start">{country.area.toLocaleString()}</td>
                    <td className="px-4 py-2 sm:text-[14px] md:text-[16px] text-[#D2D5DA] text-start">{country.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center my-6">
          {page > 1 && (
            <button onClick={prevPage} className="hover:border-2 hover:border-[#6C727F] text-[#D2D5DA] px-4 py-2 rounded-md">
              prev
            </button>
          )}

          <h3 className="text-[#6c838f]">{page}</h3>

          {page < 13 && (
            <button onClick={nextPage} className="hover:border-2 hover:border-[#6C727F] text-[#D2D5DA] px-4 py-2 rounded-md">
              next
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
