"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import LineChart from "@/src/components/Stocks/LineChart";
import TickerCard from "@/src/components/Stocks/TickerCard";
import Loader from "@/src/components/units/Loader";
import NextButton from "@/src/components/units/NextButton";

interface StockInfo {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
}

const StocksPage = () => {
  const [stockInfo, setStockInfo] = useState<StockInfo[] | null>(null);
  const [filteredStockInfo, setFilteredStockInfo] = useState<StockInfo[] | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10

  useEffect(() => {
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`;
    axios
      .get(url)
      .then((response) => {
        const commonStocks = response.data.filter(
          (stock: StockInfo) => stock.type === "Common Stock"
        );
        commonStocks.sort((a: StockInfo, b: StockInfo) =>
          a.symbol.localeCompare(b.symbol)
        );
        setStockInfo(commonStocks);
        setFilteredStockInfo(commonStocks)
      })
      .catch((error) => {
        console.error("Error fetching company profile:", error);
        setStockInfo(null);
      });
  }, []);

  const loadNextPageStocks = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1)
    }, 2000);
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-3 mb-20">
      <div className="mx-10">
        <div className="font-bold text-4xl sm:text-5xl mb-2">Stocks</div>
        <div className="mt-3 text-xl">View the latest prices</div>
        <div className="border-b border-gray-400 mb-8 mt-6" />
        <div className="flex flex-row items-center space-x-3"></div>
        {filteredStockInfo ? (
          <>
            {filteredStockInfo
              .slice(0, page * PAGE_SIZE)
              .map((stock) => (
                <TickerCard key={stock.symbol} ticker={stock.symbol} />
              ))}
              <div className="flex justify-center">
                <NextButton onClick={loadNextPageStocks} />
              </div>
          </>
        ) : (
          <div className="fixed top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Loader />
          </div>
        )}
        {/* <LineChart ticker="AAPL" /> */}
      </div>
    </div>
  );
};

export default StocksPage;
