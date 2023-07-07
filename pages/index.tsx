import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import NextLink from 'next/link'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
  CardActionArea
} from '@mui/material'

import { monthNames } from '@/utils/months'
import Report from '@/components/ui/report'
import { useHome } from '@/components/configs/homeConfig'

const Home: NextPage = () => {
  const { getReportState } = useHome()

  return (
    <>
      <Head>
        <title>Pocket Health App</title>
        <meta name='description' content='Pocket Health App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main style={{ padding: 25 }}>
        <Grid container spacing={2}>
          {monthNames.map((month, index) => (
            <Grid key={index} item xs={12} sm={12} lg={3}>
              <NextLink legacyBehavior href={`/months/${month}`}>
                <Link style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      backgroundColor: '#DCD7C9'
                    }}
                  >
                    <CardActionArea
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 25, textDecoration: 'none' }}
                          color='black'
                        >
                          {month}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </NextLink>
            </Grid>
          ))}
        </Grid>
        <Report dataPie={getReportState} />
      </main>
    </>
  )
}

export default Home
