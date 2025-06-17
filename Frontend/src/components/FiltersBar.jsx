import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import Loader from "@/components/Loader";
import { useParams } from "react-router-dom";

const FiltersBar = ({ filters, onChange, onReset }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [error, setError] = useState(null);
  const { category } = useParams();

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/v1/subcategories/${category}`);
        const data = await response.json();
        if (data.status && data.data) {
          setSubCategories(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch subcategories');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSubCategories();
    }
  }, [category]);

  const handleCategoryToggle = (cat) => {
    const updated = filters.category.includes(cat)
      ? filters.category.filter((c) => c !== cat)
      : [...filters.category, cat];
    onChange({ ...filters, category: updated });
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    onChange({ ...filters, price: range });
  };

  const handleSortChange = (value) => {
    onChange({ ...filters, sort: value });
  };

  useEffect(() => {
    setPriceRange(filters.price);
  }, [filters.price]);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md mb-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      {loading ? (
        <Loader size="md" message="Loading filters..." />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          {/* Category Filter */}
          <div className="flex-1 min-w-[200px]">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  {subCategories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={cat}
                        checked={filters.category.includes(cat)}
                        onCheckedChange={() => handleCategoryToggle(cat)}
                      />
                      <label htmlFor={cat} className="text-sm">
                        {cat}
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Price Range */}
          <div className="flex-1 min-w-[200px]">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground hover:text-white transition-colors duration-300">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              range
            />
          </div>

          {/* Sort */}
          <div className="w-full lg:w-[200px]">
            <Select onValueChange={handleSortChange} value={filters.sort}>
              <SelectTrigger className="hover:text-white transition-colors duration-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priceLowHigh">
                  <div className="flex items-center gap-2">
                    <ArrowUpIcon className="h-4 w-4" />
                    Price: Low to High
                  </div>
                </SelectItem>
                <SelectItem value="priceHighLow">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="h-4 w-4" />
                    Price: High to Low
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset */}
          <div className="w-full lg:w-auto">
            <Button
              variant="outline"
              onClick={onReset}
              className="w-full lg:w-auto border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;