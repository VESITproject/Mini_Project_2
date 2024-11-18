import React, { useState } from 'react';
import { FilterIcon, TrendingUpIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ChakraProvider, Box, Stack, Button, Input, Select, Text } from '@chakra-ui/react';

function Sidebar({ isOpen, onToggle }) {
  const [activeTab, setActiveTab] = useState('filters');

  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      width="280px"
      bg="white"
      boxShadow="lg"
      transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
      transition="transform 0.3s ease-in-out"
    >
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">Filters</Text>
          <Button onClick={onToggle} p={2} rounded="full" _hover={{ bg: 'gray.100' }}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Button>
        </Box>

        <Stack direction="row" mb={6}>
          <Button
            flex="1"
            py={2}
            bg={activeTab === 'filters' ? 'blue.100' : 'gray.100'}
            color={activeTab === 'filters' ? 'blue.600' : 'gray.600'}
            onClick={() => setActiveTab('filters')}
            leftIcon={<FilterIcon className="w-5 h-5" />}
          >
            Filters
          </Button>
          <Button
            flex="1"
            py={2}
            bg={activeTab === 'trends' ? 'blue.100' : 'gray.100'}
            color={activeTab === 'trends' ? 'blue.600' : 'gray.600'}
            onClick={() => setActiveTab('trends')}
            leftIcon={<TrendingUpIcon className="w-5 h-5" />}
          >
            Trends
          </Button>
        </Stack>

        {activeTab === 'filters' ? (
          <Stack spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Location</Text>
              <Input placeholder="Enter location" />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Pollutant</Text>
              <Select placeholder="Select pollutant">
                <option value="pm25">PM2.5</option>
                <option value="no2">NO2</option>
                <option value="co">CO</option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Time Range</Text>
              <Select placeholder="Select time range">
                <option value="1d">Last 24 hours</option>
                <option value="1w">Last week</option>
                <option value="1m">Last month</option>
                <option value="1y">Last year</option>
              </Select>
            </Box>
            <Button colorScheme="blue" width="full">Apply Filters</Button>
          </Stack>
        ) : (
          <Stack spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Pollutant</Text>
              <Select placeholder="Select pollutant">
                <option value="pm25">PM2.5</option>
                <option value="no2">NO2</option>
                <option value="co">CO</option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Time Range</Text>
              <Select placeholder="Select time range">
                <option value="1w">Last week</option>
                <option value="1m">Last month</option>
                <option value="3m">Last 3 months</option>
                <option value="1y">Last year</option>
              </Select>
            </Box>
            <Button colorScheme="blue" width="full">View Trend</Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function Demo() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChakraProvider>
      <Box display="flex" minHeight="100vh">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

        {/* Main Content Area */}
        <Box ml={isSidebarOpen ? '280px' : '0'} transition="margin 0.3s ease-in-out" flex="1" p={6}>
          <Button variant="outline" onClick={toggleSidebar}>
            Toggle Sidebar
          </Button>
          <Text mt={4}>This is your main content area.</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Demo;
