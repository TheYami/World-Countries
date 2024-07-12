'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Image from 'next/image';
import background from '../img/hero-image-wr.jpg'
import logo from '../img/Logo.svg'

interface Country {
  id: number; // เพิ่ม id ใน interface
  name: {
    common: string;
    official: string;
  };
  population: string;
  area: string;
  capital: string;
  subregion: string;
  languages: Languages;
  currencies: Currencies;
  continents: string;
  flags: {
    png: string;
  };
}

interface Languages {
  [key: string]: string;
}

interface Currencies {
  [key: string]: {
    name: string;
  };
}
interface pageProp{
  params:any;
  flags: {
      png: string;
    };
  name: {
    common : string;
    official : string;
  };
  population:string;
  area:string;
  capital:string;
  subregion:string;
  languages:Languages;
  currencies:Currencies;
  continents:string;
}

export default function page({ params }: pageProp) {
  const index = params.id; // นำ index มาจาก params

  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        if (response.data && response.data[index]) {
          const countryData = response.data[index];
          // เพิ่ม id ให้กับข้อมูลประเทศ
          const countryWithId: Country = {
            ...countryData,
            id: index,
          };
          setCountry(countryWithId);
        } else {
          throw new Error('Country data not found');
        }
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, [index]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-[#1b1d1f] h-[150vh]'>
      <div className='relative z-0'>
        <Image src={background} alt='background' className='w-full h-[150px] object-cover' />

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Image src={logo} alt='logo' />
        </div>
      </div>

      <div className='absolute w-[55%] max-w-[55%] top-[20%] left-[50%] transform -translate-x-[50%] translate-y-[20%]  bg-[#1C1D1F] mx-5 rounded-xl border-[1px] border-[#282B30]'>
        <div className='relative'>
          <Image src={country.flags.png} alt={country.name.common} width={100} height={100}
            className='absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[20%] w-[300px] h-[200px] object-cover rounded-md'
          />
        </div>

        <h2 className='mt-[12rem] text-center font-semibold text-[2rem] text-[#D2D5DA]'>{country.name.common}</h2>
        <h3 className='text-center text-[16px] text-[#D2D5DA]'>{country.name.official}</h3>

        <div className='w-full flex items-center justify-center gap-6 mt-8 border-b-[1px] border-[#6C727F] pb-10'>
          <div className='bg-[#282B30] flex gap-4 px-4 py-2 rounded-md items-center'>
            <h4 className='border-r-2 px-4 border-[#1B1D1F] text-[14px] text-[#d2d5da]'>Population</h4>
            <h3 className='text-[16px] text-[#d2d5da]'>{country.population.toLocaleString()}</h3>
          </div>

          <div className='bg-[#282B30] flex gap-4 px-4 py-2 rounded-md items-center'>
            <h4 className='border-r-2 px-4 border-[#1B1D1F] text-[14px] text-[#d2d5da]'>Area (km<sup>2</sup>)</h4>
            <h3 className='text-[16px] text-[#d2d5da]'>{country.area.toLocaleString()}</h3>
          </div>
        </div>

        <div className='flex items-center justify-between border-b-[1px] border-[#6C727F] py-6 px-4'>
          <h3 className='text-[16px] text-[#6C727F]'>Capital</h3>
          <h3 className='text-[16px] text-[#d5d2da]'>{country.capital}</h3>
        </div>

        <div className='flex items-center justify-between border-b-[1px] border-[#6C727F] py-6 px-4'>
          <h3 className='text-[16px] text-[#6C727F]'>Subregion</h3>
          <h3 className='text-[16px] text-[#d5d2da]'>{country.subregion}</h3>
        </div>

        <div className='flex items-center justify-between border-b-[1px] border-[#6C727F] py-6 px-4'>
          <h3 className='text-[16px] text-[#6C727F]'>Language</h3>
          <div className='text-[16px] text-[#d5d2da]'>
            {Object.keys(country.languages).map((key) => (
              <div key={key}>
                <h3>{country.languages[key]}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className='flex items-center justify-between border-b-[1px] border-[#6C727F] py-6 px-4'>
          <h3 className='text-[16px] text-[#6C727F]'>Currencies</h3>
          <h3 className='text-[16px] text-[#d5d2da]'>
            {Object.keys(country.currencies).map((key) => (
              <h3 key={key}>{country.currencies[key].name}</h3>
            ))}
          </h3>
        </div>

        <div className='flex items-center justify-between py-6 px-4'>
          <h3 className='text-[16px] text-[#6C727F]'>Continents</h3>
          <h3 className='text-[16px] text-[#d5d2da]'>{country.continents}</h3>
        </div>

      </div>
    </div>
  );
}
