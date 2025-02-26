import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import currency from './assets/currency.png';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const App = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [currencyList, setCurrencyList] = useState([]);
  const [amount, setAmount] = useState(1);

  const currencyNames = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    JPY: "Japanese Yen",
    INR: "Indian Rupee",
    CNY: "Chinese Yuan",
    CHF: "Swiss Franc",
    SEK: "Swedish Krona",
    NZD: "New Zealand Dollar",
    MXN: "Mexican Peso",
    SGD: "Singapore Dollar",
    HKD: "Hong Kong Dollar",
    NOK: "Norwegian Krone",
    KRW: "South Korean Won",
    TRY: "Turkish Lira",
    RUB: "Russian Ruble",
    ZAR: "South African Rand",
    BRL: "Brazilian Real",
    AED: "United Arab Emirates Dirham",
    MYR: "Malaysian Ringgit",
    THB: "Thai Baht",
    IDR: "Indonesian Rupiah",
    SAR: "Saudi Riyal",
    DKK: "Danish Krone",
    PLN: "Polish Zloty",
    ILS: "Israeli New Shekel",
    ARS: "Argentine Peso",
    COP: "Colombian Peso",
    TWD: "Taiwan Dollar",
    PHP: "Philippine Peso",
    HUF: "Hungarian Forint",
    CZK: "Czech Koruna",
    KWD: "Kuwaiti Dinar",
    EGP: "Egyptian Pound",
    BGN: "Bulgarian Lev",
    RON: "Romanian Leu",
    QAR: "Qatari Rial",
    CLP: "Chilean Peso",
    PEN: "Peruvian Nuevo Sol",
    JMD: "Jamaican Dollar",
    LKR: "Sri Lankan Rupee",
    BHD: "Bahraini Dinar",
    VND: "Vietnamese Dong",
    PAB: "Panamanian Balboa",
    KHR: "Cambodian Riel",
    MDL: "Moldovan Leu",
    LBP: "Lebanese Pound",
    LTL: "Lithuanian Litas",
    HRK: "Croatian Kuna",
    MOP: "Macanese Pataca",
    TND: "Tunisian Dinar",
    NPR: "Nepalese Rupee",
    MUR: "Mauritian Rupee",
    GHS: "Ghanaian Cedi",
    ZWD: "Zimbabwean Dollar",
    BDT: "Bangladeshi Taka",
    PYG: "Paraguayan Guarani",
    KZT: "Kazakhstani Tenge",
    JOD: "Jordanian Dinar",
    OMR: "Omani Rial",
    UAH: "Ukrainian Hryvnia",
    KHR: "Cambodian Riel",
    CDF: "Congolese Franc",
    SOS: "Somali Shilling",
    MWK: "Malawian Kwacha",
    YER: "Yemeni Rial",
    MNT: "Mongolian Tugrik",
    GTQ: "Guatemalan Quetzal",
    HTG: "Haitian Gourde",
    FKP: "Falkland Islands Pound",
    WST: "Samoan Tala",
    KPW: "North Korean Won",
    GIP: "Gibraltar Pound",
    BMD: "Bermudian Dollar",
    NIO: "Nicaraguan Córdoba",
    XOF: "West African CFA Franc",
    XAF: "Central African CFA Franc",
    ZMK: "Zambian Kwacha",
    NAF: "Netherlands Antillean Guilder",
    BIF: "Burundian Franc",
    XCD: "East Caribbean Dollar",
    LRD: "Liberian Dollar",
    TJS: "Tajikistani Somoni",
    KMF: "Comorian Franc",
    MGA: "Malagasy Ariary",
    GNF: "Guinean Franc",
    BWP: "Botswana Pula",
    TMT: "Turkmenistani Manat",
    TJS: "Tajikistani Somoni",
    MZN: "Mozambican Metical",
    SZL: "Swazi Lilangeni",
    RWF: "Rwandan Franc",
    DJF: "Djiboutian Franc",
    SCR: "Seychellois Rupee",
    CUC: "Cuban Convertible Peso",
    CUP: "Cuban Peso",
    SYP: "Syrian Pound",
    MKD: "Macedonian Denar",
    AFN: "Afghan Afghani",
    TTD: "Trinidad and Tobago Dollar",
    BOB: "Bolivian Boliviano",
    SLL: "Sierra Leonean Leone",
    KGS: "Kyrgyzstani Som",
    LKR: "Sri Lankan Rupee",
    PKR: "Pakistani Rupee",
    GEL: "Georgian Lari",
    AMD: "Armenian Dram",
    LBP: "Lebanese Pound",
    GYD: "Guyanese Dollar",
    BDT: "Bangladeshi Taka",
    MOP: "Macanese Pataca",
    MZN: "Mozambican Metical",
    MDL: "Moldovan Leu",
    MUR: "Mauritian Rupee",
    TWD: "Taiwan Dollar",
    PYG: "Paraguayan Guarani",
    TJS: "Tajikistani Somoni",
    SCR: "Seychellois Rupee",
    CUC: "Cuban Convertible Peso",
    CUP: "Cuban Peso",
    MNT: "Mongolian Tugrik",
    DJF: "Djiboutian Franc",
    BTN: "Bhutanese Ngultrum",
    WST: "Samoan Tala",
    VUV: "Vanuatu Vatu",
    MNT: "Mongolian Tugrik",
    BDT: "Bangladeshi Taka",
    NPR: "Nepalese Rupee",
    JOD: "Jordanian Dinar",
    CNY: "Chinese Yuan",
    VES: "Venezuelan Bolívar",
    IRR: "Iranian Rial",
    UZS: "Uzbekistani Som",
    AWG: "Aruban Florin",
    KGS: "Kyrgyzstani Som",
    GNF: "Guinean Franc",
    BWP: "Botswana Pula",
    MZN: "Mozambican Metical",
    TMT: "Turkmenistani Manat",
    SZL: "Swazi Lilangeni",
    SLL: "Sierra Leonean Leone",
    LRD: "Liberian Dollar",
    GMD: "Gambian Dalasi",
    BHD: "Bahraini Dinar",
    BDT: "Bangladeshi Taka",
    YER: "Yemeni Rial",
    MWK: "Malawian Kwacha",
    KWD: "Kuwaiti Dinar",
    JMD: "Jamaican Dollar",
    MKD: "Macedonian Denar",
    KMF: "Comorian Franc",
    AED: "United Arab Emirates Dirham",
    SYP: "Syrian Pound",
    MWK: "Malawian Kwacha",
    BTN: "Bhutanese Ngultrum",
    UGX: "Ugandan Shilling",
    BOB: "Bolivian Boliviano",
    PAB: "Panamanian Balboa",
    BBD: "Barbadian Dollar",
    CLP: "Chilean Peso",
    VES: "Venezuelan Bolívar",
    MWK: "Malawian Kwacha",
    XOF: "West African CFA Franc",
    PAB: "Panamanian Balboa",
    PKR: "Pakistani Rupee",
    AED: "United Arab Emirates Dirham",
    TTD: "Trinidad and Tobago Dollar",
    YER: "Yemeni Rial",
    CNY: "Chinese Yuan",
    QAR: "Qatari Rial",
    GHS: "Ghanaian Cedi",
    NPR: "Nepalese Rupee",
    COP: "Colombian Peso",
    EGP: "Egyptian Pound",
    BWP: "Botswana Pula",
    MNT: "Mongolian Tugrik",
    TND: "Tunisian Dinar",
    MUR: "Mauritian Rupee",
    MAD: "Moroccan Dirham",
    MZN: "Mozambican Metical",
    AOA: "Angolan Kwanza",
    MGA: "Malagasy Ariary",
    HRK: "Croatian Kuna",
    LBP: "Lebanese Pound",
    FKP: "Falkland Islands Pound",
    HTG: "Haitian Gourde",
    BIF: "Burundian Franc",
    SCR: "Seychellois Rupee",
    ALL: "Albanian Lek",
    ANG: "Netherlands Antillean Guilder",
    AZN: "Azerbaijani Manat",
    BAM: "Bosnia and Herzegovina Convertible Mark",
    BND: "Brunei Dollar",
    BSD: "Bahamian Dollar",
    BTC: "Bitcoin",
    BYN: "Belarusian Ruble",
    BZD: "Belize Dollar",
    CLF: "Chilean Unit of Account (UF)",
    CNH: "Chinese Yuan (Offshore)",
    CRC: "Costa Rican Colón",
    CVE: "Cape Verdean Escudo",
    DOP: "Dominican Peso",
    DZD: "Algerian Dinar",
    ERN: "Eritrean Nakfa",
    ETB: "Ethiopian Birr",
    FJD: "Fijian Dollar",
    GGP: "Guernsey Pound",
    HNL: "Honduran Lempira",
    IMP: "Isle of Man Pound",
    IQD: "Iraqi Dinar",
    ISK: "Icelandic Króna",
    JEP: "Jersey Pound",
    KES: "Kenyan Shilling",
    KYD: "Cayman Islands Dollar",
    LAK: "Laotian Kip",
    LSL: "Lesotho Loti",
    LYD: "Libyan Dinar",
    MMK: "Myanmar Kyat",
    MRU: "Mauritanian Ouguiya",
    MVR: "Maldivian Rufiyaa",
    NAD: "Namibian Dollar",
    NGN: "Nigerian Naira",
    PGK: "Papua New Guinean Kina",
    RSD: "Serbian Dinar",
    SBD: "Solomon Islands Dollar",
    SDG: "Sudanese Pound",
    SHP: "Saint Helena Pound",
    SRD: "Surinamese Dollar",
    SSP: "South Sudanese Pound",
    STD: "São Tomé and Príncipe Dobra",
    STN: "São Tomé and Príncipe Dobra",
    SVC: "Salvadoran Colón",
    TOP: "Tongan Pa'anga",
    TZS: "Tanzanian Shilling",
    UYU: "Uruguayan Peso",
    VEF: "Venezuelan Bolívar (old)",
    XAG: "Silver Ounce",
    XAU: "Gold Ounce",
    XDR: "Special Drawing Rights",
    XPD: "Palladium Ounce",
    XPF: "CFP Franc",
    XPT: "Platinum Ounce",
    ZMW: "Zambian Kwacha",
    ZWL: "Zimbabwean Dollar"
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://openexchangerates.org/api/currencies.json');
        setCurrencyList(Object.keys(response.data));
      } catch (error) {
        console.error('Error fetching currency list:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('https://openexchangerates.org/api/time-series.json', {
        params: {
          app_id: apiKey,
          start: '2024-02-01',
          end: '2026-02-25',
          symbols: selectedCurrency,
          base: 'USD',  // Always use USD as base
        },
      });

      const historicalRates = response.data.rates;
      const chartData = [];
      const chartLabels = [];

      for (const [date, rates] of Object.entries(historicalRates)) {
        chartLabels.push(moment(date).format('MMM D'));
        chartData.push(rates[selectedCurrency]);
      }

      setLabels(chartLabels);
      setData(chartData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://openexchangerates.org/api/latest.json', {
        params: {
          app_id: apiKey,
          base: 'USD',
        },
      });

      const rates = response.data.rates;
      const selectedCurrencyRate = rates[selectedCurrency];

      setLabels([moment().format('MMM D')]);
      setData([selectedCurrencyRate]);

      fetchHistoricalData();
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCurrency]);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: `${selectedCurrency} to USD Exchange Rate`,
        data: data,
        fill: false,
      },
    ],
  };

  const convertedAmount = data.length > 0 ? amount * data[data.length - 1] : 0;

  return (
    <div className="container">
      <h1>
        <span>$</span> US Dollar Forex Calculator <span>$</span>
      </h1>
      <a target="_blank" rel="noopener noreferrer">
        <img src={currency} className="currency" alt="currency" />
      </a>

      <div className="selections">
        <div>
          <label>Select a Currency to Compare:</label>
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            {currencyList.map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode} - {currencyNames[currencyCode] || currencyCode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Amount to Convert:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="1"
          />
        </div>
      </div>

      {data.length > 0 && (
        <div>
          <h3>Exchange Rate</h3>
          <p>
            {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD = {" "}
            {Number(convertedAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
            {selectedCurrency}
          </p>




        </div>
      )}

      {/* <div className="chart-container">
        <Line data={chartData} />
      </div> */}
    </div>
  );
};

export default App;