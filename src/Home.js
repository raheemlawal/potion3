import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Grid,
  theme,
  Heading,
  Input,
  Button,
  Card, CardBody, Stack,CardHeader,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';
import {TimeScale} from 'chart.js'; 
Chart.register(TimeScale);


/*

Range - for each day (month) or month (year) 

NFT API
  Number of transfers
  Number of owners

Events API
  Number of events

*/

//Live vs historical data
function Home() {

  const [vals, setVals] = useState([])
  const [vals2, setVals2] = useState([])
  //const [addy, setAddy] = useState("")

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Project Name',
        color:"#0F00B0",
      },
      scales: {
        x: {
            type: 'time',
            time: {
                unit: 'month'
            }
        },
        A: {
          title: {
            display: true,
            text: 'Number of Transfers'
          },
          type: 'linear',
          position: 'left',
        },
        B: {
          title:{
            display: true,
            text: ' ETH Value'
          },
          type: 'linear',
          position: 'right',
      }
        }
  };
  const data = {
    type: 'bar',
    datasets: [
      {
        yAxisID: 'A',
        label: 'Number of Transfers',
        data: vals,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.5,
      },
      {
        yAxisID: 'B',
        label: 'ETH Value',
        data: vals2,
        backgroundColor: 'rgba(5, 99, 132, 0.5)',
        tension: 0.5,
      },
    ],
  };

  //0x895bBc29f74dF77279Bf585116Caa24CE33ed0bA
  function fA(){

    const options = {
      method: 'GET',
      //url: `https://deep-index.moralis.io/api/v2/nft/${addy}/transfers`,
      url: `https://deep-index.moralis.io/api/v2/nft/0x895bBc29f74dF77279Bf585116Caa24CE33ed0bA/transfers`,
      params: {chain: 'eth', format: 'decimal', normalizeMetadata: 'false'},
      headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_TEST_KEY}
    };

    axios
    .request(options)
    .then(function (response) {

      
      var results = response.data.result
      
      const output = results.map((res) => ({b:res.block_timestamp.slice(0,10), ethvalue: Number(res.value)/Math.pow(10,18)}));

      console.log(output)

      
      const reducer = (map, val) => {
        if (map[val.b] == null) {
          map[val.b] = 1;
        } else {
          ++map[val.b];
        }
        return map;
      };
      
      const reducer2 = (map, val) => {

        if (map[val.b] == null) {
          map[val.b] = val.ethvalue;
        } else {
          map[val.b] += val.ethvalue;
        }
        return map;
      };
      
      const ts = output.reduce(reducer, {});
      const eths = output.reduce(reducer2,{})
      

      console.log(ts)
      console.log(eths)

      setVals(ts)
      setVals2(eths)

    })
    .catch(function (error) {
      console.error(error);
    });
  
  }

  //onChange={e => setAddy(e.target.value)}/>

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={2}>
          <HStack justifySelf="flex-end">
            <Button>Project Name</Button>
            <ColorModeSwitcher justifySelf="flex-end" />     
          </HStack>
          <VStack spacing={4}>
            <Heading>NFT Data</Heading>
            <Stack direction={['column', 'row']} spacing='20px'>
              <Input placeholder='enter contract address ...' size='md' width='30vw'/> 
              <Button onClick={fA}>Get Data</Button>
            </Stack>
            <Card width={"80vw"} height={"50vh"}>
              <CardHeader>
                <Heading size='md'>Transfers/ETH Value</Heading>
              </CardHeader>
              <CardBody>
              <Bar
                className='chartco'
                options={options} 
                data={data}
              />
              </CardBody>
            </Card>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
