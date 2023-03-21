import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.HERE_GEOCODING_API_KEY;
const appId = process.env.HERE_GEOCODING_APP_ID;

export const MapPointer = {
  getAllProvinces: async () => {
    try {
      const url = 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1';
      return (await axios.get(url))?.data?.data?.data?.map((province) => {
        return { code: province.code, name: province.name };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllDistrictsByProvinceCode: async (provinceCode) => {
    try {
      const url = `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`;
      return (await axios.get(url))?.data?.data?.data?.map((district) => {
        return { code: district.code, name: district.name_with_type };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllWardsByDistrictCode: async (districtCode) => {
    try {
      const url = `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`;
      return (await axios.get(url))?.data?.data?.data?.map((ward) => {
        return { code: ward.code, name: ward.name_with_type };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getRelativeCoordinatesByAdress: async (address) => {
    try {
      const url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${apiKey}`;
      return (await axios.get(url))?.data?.items[0]?.position;
    } catch (error) {
      throw new Error(error);
    }
  },
  getLocationByCoordinates: async ({ lat, lng }) => {
    try {
      const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${apiKey}&app_id=${appId}&at=${lat},${lng}`;
      const { street, district, city, county, countryName } = (
        await axios.get(url)
      ).data.items[0].address;
      return [street, district, city, county, countryName].join(', ');
    } catch (error) {
      throw new Error(error);
    }
  },
};
